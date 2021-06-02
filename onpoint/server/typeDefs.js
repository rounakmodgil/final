const {gql} = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    hello: String
    bye: String
    users: [User!]!
    user(id: ID!): User!
    me: ID
    getCategory: [Category]!
    fetchposts(
      state: String!
      district: String!
      category: String!
    ): [Poststruct]
    getstates: [String]!
    getdistricts(state: String!): [String]!
    posts: [Poststruct]
    notifications: [notifstruct]
  }

  type notifstruct {
    id: ID!
    header: String!
    description: String!
  }

  type Poststruct {
    id: ID!
    userid: ID!
    description: String!
    title: String!
    category: String!
    physical: Boolean!
    imageurl: String!
    verified: Boolean!
    location: locationtype
    reviews: [reviewtype]
    photos: [phototype]
  }

  type locationtype {
    latitude: Int
    longitude: Int
  }
  type reviewtype {
    userid: String!
    username: String!
    rating: Int
    comment: String
  }
  type phototype {
    imgurl: String!
  }
  type Category {
    id: ID!
    category: String
  }
  type User {
    id: ID!
    name:String!
    email: String!
    password: String!
    tokenVersion: Int!
    phone: String!
    Posts: [Posttype]
    bookMarks: [Posttype]
  }

  type Posttype {
    postid: String
  }

  type LoginResponse {
    accessToken: String!
    user: User!
  }
  type S3Payload {
    signedRequest: String!
    url: String!
  }
  type Mutation {
    createUser(
      name: String!
      phone: String!
      email: String!
      password: String!
    ): Boolean!
    login(email: String!, password: String!): LoginResponse
    revokeRefreshToken(userId: String!): Boolean!
    logout: Boolean!
    signS3(filename: String!, filetype: String!): S3Payload!
    addpost(
      userid: ID!
      title: String!
      description: String!
      category: String!
      imageurl: String
      physical: Boolean!
    ): Boolean!
    addreview(
      postid: String!
      userid: String!
      username: String!
      rating: Int!
      comment: String!
    ): Boolean!
    addphoto(imgurl:String, postid:String! ):Boolean!
    addnotification(header: String!, description: String!): Boolean!
    addcategory(category: String!): Boolean!
    bookmark(userid: ID!, postid: ID!): Boolean!
    unbookmark(userid: ID!, postid: ID!): Boolean!
    profileupdate(userid: ID!, name: String!, phone: String!): Boolean!
  }
`;
module.exports = {typeDefs};
