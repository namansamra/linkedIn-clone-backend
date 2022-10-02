const Query = require('./query');
const Mutation = require('./mutation');
const User = require('./schema/User');
const Post = require('./schema/Post');
const Comment = require('./schema/Comment');

const typeDefs = [Query, Mutation, User, Post, Comment];

module.exports = typeDefs;
