require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs/index');
const resolvers = require('./resolvers/index');
const { findOrCreateUser } = require('./controller/userController');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let auth = null;
    let authType = null;
    let currentUser = null;
    try {
      auth = req.headers.authorization;
      authType = req.headers['x-auth-type'];
      if (auth && authType) {
        currentUser = await findOrCreateUser(auth, authType);
      }
    } catch (err) {
      console.error(`Unable to authenticate user with token ${auth}`);
    }
    console.log(currentUser);
    return { currentUser };
  },
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log('Helo server is running at' + url);
});
