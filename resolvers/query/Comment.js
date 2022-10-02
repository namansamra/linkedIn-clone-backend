const { gql } = require('apollo-server');
const { CommentSchema, PostSchema } = require('../../db/Models');
const { authenticated } = require('../authChecker');

const userResolvers = {
  Query: {
    comments: authenticated(async (root, args, ctx, info) => {
      const postId = args.postId;
      const post = await PostSchema.find({ _id: postId });
      let promises = [];
      post.comments.map((c) => {
        let res = CommentSchema.findById(c.id);
        promises.push(res);
      });

      const comments = await Promise.all(promises);
      return comments;
    }),
  },
};
module.exports = userResolvers;
