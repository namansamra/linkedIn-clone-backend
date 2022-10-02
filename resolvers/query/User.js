const { gql } = require('apollo-server');
const { UserSchema } = require('../../db/Models');
const { authenticated } = require('../authChecker');

const userResolvers = {
  Query: {
    users: authenticated(async (root, args, ctx, info) => {
      try {
        const users = await UserSchema.find({})
          .populate('posts')
          .populate('likedPosts');
        return users;
      } catch (error) {
        console.log(error);
        throw new Error('Some error in data fetching');
      }
    }),
    user: authenticated(async (root, args, ctx, info) => {
      try {
        const user = await UserSchema.findOne({ _id: args.id })
          .populate('posts')
          .populate('likedPosts');
        if (user) {
          return user;
        } else {
          throw new Error('some error');
        }
      } catch (error) {
        console.log(error);
        throw new Error('Some error in data fetching');
      }
    }),
  },
};
module.exports = userResolvers;
