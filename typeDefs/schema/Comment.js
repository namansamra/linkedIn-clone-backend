const { gql } = require('apollo-server');

const Comment = gql`
  type Comment {
    id: ID!
    body: String!
    postId: String!
    userId: User
  }
`;

module.exports = Comment;
