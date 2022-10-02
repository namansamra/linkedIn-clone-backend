const { gql } = require('apollo-server');
var mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const { PostSchema, CommentSchema } = require('../../db/Models');
const { authenticated } = require('../authChecker');

const userResolvers = {
  Mutation: {
    addComment: authenticated(async (root, args, ctx, info) => {
      const postId = args.input.postId;
      console.log(ctx);
      const newComment = { ...args.input, userId: ctx.currentUser._id };
      try {
        const { _id } = await CommentSchema.create(newComment);
        await PostSchema.findOneAndUpdate(
          { _id: postId },
          {
            $push: { comments: _id },
          }
        );
        return {
          message: 'successfully added comment on post',
        };
      } catch (error) {
        console.log(error);
        throw new Error('some error');
      }
    }),
  },
};
module.exports = userResolvers;
