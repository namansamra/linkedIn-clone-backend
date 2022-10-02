const { gql } = require('apollo-server');

const Mutation = gql`
  type response {
    message: String!
  }

  input ADD_USER_INPUT {
    name: String!
    emailId: String!
    avatar: String
    password: String!
  }

  input UPDATE_USER_INPUT {
    name: String
    password: String
    position: String
    company: String
    about: String
  }

  input ADD_POST_INPUT {
    body: String!
    createdAt: String!
    image: String
  }

  input ADD_LIKE_INPUT {
    postId: String!
  }

  input ADD_COMMENT_INPUT {
    body: String!
    postId: String!
  }

  type Mutation {
    signInUser: User
    updateUser(input: UPDATE_USER_INPUT): User
    addPost(input: ADD_POST_INPUT): response
    addComment(input: ADD_COMMENT_INPUT): response
    addLike(input: ADD_LIKE_INPUT): response
    removePost(id: ID!): response
    removeComment(id: ID!, postId: ID!): response
    removeLike(id: ID!): response
  }
`;

module.exports = Mutation;
