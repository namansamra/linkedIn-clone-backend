const { gql } = require('apollo-server');

const Query = gql`
  type response {
    message: String!
  }
  type Query {
    posts: [Post]
    users: [User]
    user(id: ID!): User
    comments: [Comment]
    post(id: ID!): Post
  }
`;
module.exports = Query;
