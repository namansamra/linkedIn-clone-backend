const { gql } = require('apollo-server');

const User = gql`
  type User {
    id: ID!
    name: String!
    emailId: String!
    password: String!
    avatar: String
    posts: [Post]
    likedPosts: [Post]
    savedPosts: [Post]
    access_token: String
    otherInfoFilled: Boolean
    about: String
    company: String
    position: String
  }
`;

// like contains postId liked by user
// comments contains commentsId made by user

module.exports = User;
