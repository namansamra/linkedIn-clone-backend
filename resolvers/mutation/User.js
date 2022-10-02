const { gql } = require('apollo-server');
const { UserSchema } = require('../../db/Models');
const { authenticated } = require('../authChecker');

const userResolvers = {
  Mutation: {
    signInUser: authenticated(async (root, args, ctx, info) => {
      return { ...ctx.currentUser, id: ctx.currentUser._id };
    }),
    updateUser: authenticated(async (root, args, ctx, info) => {
      const input = args.input;
      try {
        const user = await UserSchema.findOneAndUpdate(
          { _id: ctx.currentUser._id },
          {
            name: input.name,
            position: input.position,
            company: input.company,
            about: input.about,
            otherInfoFilled: true,
          }
        );
        return user;
      } catch (error) {
        throw new Error('Some error');
      }
    }),
  },
};
module.exports = userResolvers;
