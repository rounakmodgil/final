const {Users, Posts, Notification} = require('./models/User');
const {hash, compare} = require('bcryptjs');
const {createAccessToken, createRefeshToken} = require('./auth');
const {sendRefreshToken} = require('./sendRefreshToken');
const {getcurrUser, setCurrUser} = require('./currUser');
var moment = require('moment');
require('dotenv').config();
const aws = require('aws-sdk');
const s3Bucket = process.env.S3_BUCKET;

const resolvers = {
  Query: {
    hello: () => 'wassap',
    users: () => Users.find(),
    user: (_, {id}) => Users.findById(id),
    bye: () => {
      return 'bye';
    },
    me: () => getcurrUser(),
    posts: () => Posts.find(),
    notifications: () => Notification.find(),
  },
  Mutation: {
    profileupdate: async (_, {userid, name, phone}) => {
      const user = await Users.findById(userid);
      if (!user) throw new Error('no user found');
      try {
        await Users.findByIdAndUpdate(userid, {
          $set: {
            name: name,
            phone: phone,
          },
        });
      } catch (err) {
        return false;
      }
      return true;
    },
    unbookmark: async (_, {userid, postid}) => {
      const check = await Posts.findById(postid);
      const user = await Users.findById(userid);
      if (!check || !user) throw new Error('cant unbookMark');
      try {
        await Users.findByIdAndUpdate(userid, {
          $pull: {
            BookMarks: {
              postid: postid,
            },
          },
        });
      } catch (err) {
        return false;
      }
      return true;
    },
    bookmark: async (_, {userid, postid}) => {
      const check = await Posts.findById(postid);
      const user = await Users.findById(userid);
      if (!check || !user) throw new Error('cant bookMark');
      try {
        await Users.findByIdAndUpdate(userid, {
          $push: {
            BookMarks: {
              postid: postid,
            },
          },
        });
      } catch (err) {
        return false;
      }
      return true;
    },

    addcategory: async (_, {category}) => {
      const c = new Category({category});
      try {
        await c.save();
      } catch (err) {
        console.log(err);
        return false;
      }
      return true;
    },
    createUser: async (_, {name, phone, email, password}) => {
      const hashedPassword = await hash(password, 12);
      const User = new Users({name, phone, email, password: hashedPassword});
      try {
        await User.save();
      } catch (err) {
        console.log(err);
        return false;
      }
      return true;
    },

    login: async (_, {email, password}, {res}) => {
      const User = await Users.findOne({email: email});
      if (!User) {
        throw new Error('could not find the user');
      }
      const valid = await compare(password, User.password);
      if (!valid) {
        throw new Error('bad password');
      }

      //login succesfull
      setCurrUser(User.id);
      sendRefreshToken(res, createRefeshToken(User));
      return {accessToken: createAccessToken(User), user: User};
    },
    logout: async (_, {}, {res}) => {
      console.log(res);
      sendRefreshToken(res, ' ');
      return true;
    },

    revokeRefreshToken: async (_, {userId}) => {
      const User = await Users.findByIdAndUpdate(userId, {
        $inc: {tokenVersion: 1},
      });
      if (!User) {
        throw new Error('could not find the user');
      }
      return true;
    },
    addpost: async (
      parent,
      {userid, title, description, category, imageurl, physical},
    ) => {
      const User = await Users.findById(userid);
      if (!User) throw new Error(' not find the user');
      const Post = new Posts({
        userid,
        title,
        description,
        category,
        imageurl,
        physical,
        timestamp: String(moment().format('YYYY-MM-DD HH:mm')),
      });
      try {
        await Post.save();
        await Users.findByIdAndUpdate(userid, {
          $push: {
            Posts: {postid: Post.id},
          },
        });
      } catch (err) {
        console.log(err);
        return false;
      }
      return true;
    },
    addreview: async (parent, {postid, userid, username, rating, comment}) => {
      const temp = {
        userid: userid,
        username: username,
        rating: rating,
        comment: comment,
      };
      try {
        await Posts.findByIdAndUpdate(postid, {
          $push: {
            reviews: temp,
          },
        });
      } catch (err) {
        console.log(err);
        return false;
      }
      return true;
    },
    addnotification: async (parent, {header, description}) => {
      const notif = new Notification({
        header,
        description,
      });
      try {
        await notif.save();
      } catch (err) {
        console.log(err);
        return false;
      }
      return true;
    },

    signS3: async (parent, {filename, filetype}) => {
      // AWS_ACCESS_KEY_ID
      // AWS_SECRET_ACCESS_KEY
      const s3 = new aws.S3({
        signatureVersion: 'v4',
        region: 'us-east-2',
      });

      const s3Params = {
        Bucket: s3Bucket,
        Key: filename,
        Expires: 60,
        ContentType: filetype,
        ACL: 'public-read',
      };

      const signedRequest = await s3.getSignedUrl('putObject', s3Params);
      const url = `https://${s3Bucket}.s3.amazonaws.com/${filename}`;
      return {
        signedRequest,
        url,
      };
    },
    addphoto:async(_,{imgurl, postid})=>{
      const temp={
        imgurl:imgurl,
      }
      try{
      await Posts.findByIdAndUpdate(postid, {
        $push: {
          photos:temp
        }, 
      },{useFindAndModify: false})
    }catch(e){
      return false;
    }
    return true;
 
    }
  },
};
module.exports = {resolvers};
