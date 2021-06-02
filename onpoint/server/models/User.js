const mongoose = require('mongoose');

let userSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    password: String,
    tokenVersion: {
      type: Number,
      default: 0,
    },
    Posts: [
      {
        postid: String,
      },
    ],
    bookMarks: [
      {
        postid: String,
      },
    ],
  },
  {collection: 'users'},
);

let postSchema = new mongoose.Schema(
  {
    userid: String,
    timestamp: String,
    imageurl: String,
    title: String,
    description: String,
    category: String,
    physical: Boolean,
    verified: {
      type: Boolean,
      default: false,
    },
    location: {
      latitude: Number,
      longitude: Number,
    },
    reviews: [
      {
        userid: String,
        username: String,
        rating: Number,
        comment: String,
      },
    ],
    photos: [
      {
        imgurl: String,
      },
    ],
  },
  {collection: 'posts'},
);

let notificaitonSchema = new mongoose.Schema(
  {
    header: String,
    description: String,
  },
  {collection: 'notification'},
);
let reportSchema = new mongoose.Schema(
  {
    postid: String,
    userid: String,
  },
  {collection: 'report'},
);
let feedbackSchema = new mongoose.Schema(
  {
    userid:String,
    username:String,
    feedback:String
  },
  {collection:'feedback'},
)

var Users = mongoose.model('users', userSchema);
var Posts = mongoose.model('posts', postSchema);
var Notification = mongoose.model('notification', notificaitonSchema);
var Report = mongoose.model('report', reportSchema);
var Feedback = mongoose.model('feedback',feedbackSchema);

module.exports = {Users, Posts, Notification, Report,Feedback};
