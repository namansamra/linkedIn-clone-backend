const User = require('../db/Models/User');
const { OAuth2Client, auth } = require('google-auth-library');
const axios = require('axios');

const oauthClientId = process.env.OAUTH_CLIENT_ID;
const client = new OAuth2Client(
  oauthClientId,
  process.env.OAUTH_SECRET_KEY,
  process.env.OAUTH_REDIRECT_URI
);

exports.findOrCreateUser = async (auth, authType) => {
  // verify auth token
  const googleUser = await verifyAuth(auth, authType);
  // check if user exists
  const user = await checkIfUserExists(googleUser);
  // if user exists, return them; otherwise, create new user in db
  return user ? user : await createNewUser(googleUser);
};

const getGoogleUserInfo = async (access_token) => {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`
    );
    return { ...data, access_token: access_token };
  } catch (error) {
    throw new Error(error);
  }
};

const verifyAuth = async (authString, authType) => {
  console.log('inside verify auth');
  try {
    if (authType == 'code') {
      const {
        tokens: { id_token, access_token, refresh_token },
      } = await client.getToken(authString);
      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: oauthClientId,
      });
      const info = ticket.getPayload();
      console.log(info, 'getToken info google type code');
      return { ...info, access_token: access_token };
    } else {
      const info = await getGoogleUserInfo(authString);
      console.log(info, 'google user info type auth string');
      return info;
    }
  } catch (err) {
    console.log(err, 'error in verify auth');
    console.error('Error verifying auth token', err);
  }
};

const checkIfUserExists = async (googleUser) => {
  console.log('check if ');
  try {
    const user = await User.findOne({ emailId: googleUser?.email })
      .populate({
        path: 'savedPosts',
        populate: {
          path: 'user',
        },
      })
      .exec();

    if (user && user['_doc']) {
      return { ...user['_doc'], access_token: googleUser.access_token };
    }
  } catch (error) {
    console.log('dendjas');
    console.log(error);
  }
  return null;
};

const createNewUser = async (googleUser) => {
  const { name, email, picture, access_token } = googleUser;
  const user = { name, emailId: email, avatar: picture };
  try {
    const nuser = await new User(user).save();
    return {
      ...nuser,
      id: nuser._id,
      access_token: access_token,
    };
  } catch (error) {
    console.log(error, 'error in create user');
  }
};
