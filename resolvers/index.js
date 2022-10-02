const { UserQueryResolver, PostQueryResolver } = require('./query');
const {
  UserMutationResolver,
  PostMutationResolver,
  CommentMutationResolver,
} = require('./mutation');

const resolvers = [
  UserQueryResolver,
  PostQueryResolver,
  UserMutationResolver,
  PostMutationResolver,
  CommentMutationResolver,
];

module.exports = resolvers;
