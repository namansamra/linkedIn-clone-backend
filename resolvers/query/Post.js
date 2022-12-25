const { gql } = require('apollo-server');
const { PostSchema, UserSchema } = require('../../db/Models');
const { authenticated } = require('../authChecker');
const userResolvers = {
  Query: {
    posts: authenticated(async (root, args, ctx, info) => {
      try {
        const posts = await PostSchema.find({})
          .populate('user')
          .populate({
            path: 'comments',
            populate: {
              path: 'userId',
            },
          });
        return posts.reverse();
      } catch (error) {
        console.log(error);
        throw new Error('Some error in data fetching');
      }
    }),
    post: authenticated(async (root, args, ctx, info) => {
      try {
        const post = await PostSchema.findOne({
          _id: args.id,
        })
          .populate('user')
          .populate('comments');
        if (post) {
          return post;
        } else {
          throw new Error('Post not found!!');
        }
      } catch (error) {
        console.log(error);
        throw new Error('Some error occured in fetching post');
      }
    }),
    savedPosts: authenticated(async (root, args, ctx, info) => {
      try {
        const data = await UserSchema.findOne({
          _id: ctx.currentUser._id,
        })
          .populate([
            {
              path: 'savedPosts',
              populate: {
                path: 'user',
              },
            },
            {
              path: 'savedPosts',
              populate: {
                path: 'comments',
                populate: {
                  path: 'userId',
                },
              },
            },
          ])
          .select('savedPosts') //projection
          .exec();

        return data.savedPosts;
      } catch (error) {
        console.log(error);
        throw new Error('some error');
      }
    }),
  },
};
module.exports = userResolvers;
