const { gql } = require('apollo-server');

const Post = gql`
  type Post {
    id: ID!
    body: String!
    image: String
    likes: Int
    comments: [Comment]
    user: User
  }
`;

module.exports = Post;
