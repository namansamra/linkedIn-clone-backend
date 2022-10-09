const { gql } = require('apollo-server');
var mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const { PostSchema } = require('../../db/Models');
const { authenticated } = require('../authChecker');

const userResolvers = {
  Mutation: {
    addPost: authenticated(async (root, args, ctx, info) => {
      const input = args.input;
      try {
        await PostSchema.create({ ...input, user: ctx.currentUser._id });
        return {
          message: 'successfully created post',
        };
      } catch (error) {
        console.log(error);
        throw new Error('some error');
      }
    }),
    addLike: authenticated(async (root, args, ctx, info) => {
      const id = args.input.postId;
      try {
        const post = await PostSchema.findOneAndUpdate(
          {
            _id: id,
          },
          {
            $inc: { likes: 1 },
          }
        );
        return {
          message: 'post liked successfully',
        };
      } catch (error) {
        throw new Error('some error');
      }
    }),
    removePost: authenticated(async (root, args, ctx, info) => {
      const id = args.id;
      try {
        await PostSchema.remove({ _id: id });
        return {
          message: 'successfully removed post',
        };
      } catch (error) {
        throw new Error('some Error');
      }
    }),
    removeComment: authenticated(async (root, args, ctx, info) => {
      const postId = args.postId;
      const commentId = args.id;
      try {
        const res = await PostSchema.findOneAndUpdate(
          { _id: postId },
          {
            $pull: {
              comments: {
                id: commentId,
              },
            },
          }
        );

        return {
          message: 'successfully removed comment',
        };
      } catch (error) {
        throw new Error('some Error');
      }
    }),
    removeLike: authenticated(async (root, args, ctx, info) => {
      try {
        const post = await PostSchema.findOneAndUpdate(
          { _id: args.id },
          {
            $inc: { likes: -1 },
          }
        );
        return {
          message: 'successfully removed like',
        };
      } catch (error) {
        throw new Error('some error');
      }
    }),
  },
};
module.exports = userResolvers;
