import gql from 'graphql-tag';

const check = gql`
  query {
    hello
  }
`;
const bye = gql`
  query {
    bye
  }
`;
const me = gql`
  query {
    me
  }
`;
const getuser = gql`
  query($id:ID!) {
    user(id:$id) {
      id
    email
    phone
    name
    Posts{
      postid
    }
    bookMarks{
      postid
    }
    }
  }
`;
const getCategory = gql`
  query {
    getCategory {
      id
      category
    }
  }
`;
const register = gql`
  mutation(
    $name: String!
    $phone: String!
    $email: String!
    $password: String!
  ) {
    createUser(name: $name, phone: $phone, email: $email, password: $password)
  }
`;

const login = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      user {
        id
        email
      }
    }
  }
`;
const logout = gql`
  mutation {
    logout
  }
`;
const s3SignMutation = gql`
  mutation($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
      url
      signedRequest
    }
  }
`;
const savepictureurl = gql`
  mutation($profilepictureurl: String!, $id: String!) {
    savepictureurl(profilepictureurl: $profilepictureurl, id: $id)
  }
`;

const getallposts = gql`
  query {
    posts {
      id
      userid
      description
      title
      category
      physical
      location {
        latitude
        longitude
      }
      reviews {
        userid
        username
        rating
        comment
      }
      photos {
        imgurl
      }
    }
  }
`;

const editprofilemutation = gql`
  mutation($userid: ID!, $name: String!, $phone: String!) {
    profileupdate(userid: $userid, name: $name, phone: $phone)
  }
`;

const addingpost = gql`
  mutation(
    $userid: ID!
    $title: String!
    $description: String!
    $category: String!
    $physical: Boolean!
    $imageurl: String
  ) {
    addpost(
      userid: $userid
      title: $title
      description: $description
      category: $category
      physical: $physical
      imageurl: $imageurl
    )
  }
`;

const getnotifications = gql`
  query {
    notifications {
      id
      header
      description
    }
  }
`;

const addingreview = gql`
  mutation(
    $postid: String!
    $userid: String!
    $username: String!
    $rating: Int!
    $comment: String!
  ) {
    addreview(
      postid: $postid
      userid: $userid
      username: $username
      rating: $rating
      comment: $comment

    )
  }
`;
const addphoto=gql`
mutation(
  $imgurl:String!
  $postid:String!
  ){
    addphoto(
      imgurl:$imgurl
      postid:$postid
    )
  }
`;

export {
  check,
  register,
  getuser,
  login,
  bye,
  logout,
  s3SignMutation,
  savepictureurl,
  me,
  getCategory,
  getallposts,
  editprofilemutation,
  addingpost,
  getnotifications,
  addingreview,
  addphoto,
};
