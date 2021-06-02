import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  TextInput,
  ImageBackground,
  Button,
} from 'react-native';

import Review from '../components/reviewComponent';

import ImagePicker from 'react-native-image-crop-picker';
import MaIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import RBSheet from 'react-native-raw-bottom-sheet';
import moment from 'moment';

import {addingreview, me, s3SignMutation, addphoto} from '../Graphql/gql';
import {useMutation, useQuery} from '@apollo/react-hooks';

const listing = [
  {
    id: 1,
    name: 'Ankit Kumar',
    stars: 5,
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  A eni scelerisque id id. Lorem ipsum d Lorem ipsum dolor sit amet, consectetur adipiscing elit.  A eni scelerisque id id. Lorem ipsum d',
  },

  {
    id: 2,
    name: 'Nithinsai',
    stars: 3,
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  A eni scelerisque id id. Lorem ipsum d Lorem ipsum dolor sit amet, consectetur adipiscing elit.  A eni scelerisque id id. Lorem ipsum d',
  },

  {
    id: 3,
    name: 'Rounak Sharma',
    stars: 1,
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  A eni scelerisque id id. Lorem ipsum d Lorem ipsum dolor sit amet, consectetur adipiscing elit.  A eni scelerisque id id. Lorem ipsum d',
  },

  {
    id: 4,
    name: 'Tarun Acharya',
    stars: 4,
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  A eni scelerisque id id. Lorem ipsum d Lorem ipsum dolor sit amet, consectetur adipiscing elit.  A eni scelerisque id id. Lorem ipsum d',
  },
];
export default function reviewpage({route}) {
  const {postid, title, description, postRating} = route.params;

  const [addreviewmutation] = useMutation(addingreview);
  const [addingphoto] = useMutation(addphoto);
  const {data, loading} = useQuery(me);

  const [review, Setreview] = useState(true);
  const [reviewvalue, Setreviewvalue] = useState('');
  const [image, setImage] = useState(null);
  const [path, setPath] = useState(null);
  const refRBSheet = useRef();
  const [imageurl, setImageUrl]=useState(null);
  const [s3mutation, {data:response}]=useMutation(s3SignMutation);

  const formatFilename = filename => {
    const date = moment().format('YYYYMMDD');
    const randomString = Math.random().toString(36).substring(2, 7);
    const cleanFileName = filename
      .substring(filename.length, 15)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-');
    const newFilename = `images/${date}-${randomString}-${cleanFileName}`;
    return newFilename.substring(0, 60);
  };
  const uploadfromlib = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 200,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image);
      setPath(image.path);
      refRBSheet.current.close();
    });
  };
  const uploadfromcamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 200,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image);
      setPath(image.path);
      refRBSheet.current.close();
    });
  };

  const photos = [
    {image: require('../assets/netflix.png'), id: 1},
    {image: require('../assets/netflix.png'), id: 2},
    {image: require('../assets/netflix.png'), id: 3},
  ];

  const [rating, setRating] = useState(0);
  const [addreview, setAddreview] = useState(false);

  var starsContainer = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      starsContainer.push(
        <TouchableOpacity onPress={() => setRating(i + 1)}>
          <Image
            source={require('../assets/star.png')}
            style={{height: 25, width: 25, marginRight: 5}}
            key={i}
          />
        </TouchableOpacity>,
      );
    } else {
      starsContainer.push(
        <TouchableOpacity onPress={() => setRating(i + 1)}>
          <Image
            source={require('../assets/stargray.png')}
            style={{height: 25, width: 25, marginRight: 5}}
            key={i}
          />
        </TouchableOpacity>,
      );
    }
  }

  const handlesubmit = async () => {
    
    if (data) {
      if(image){  
        var filename = formatFilename(image.path);
        const res=await s3mutation({variables:{
          filename:filename,
          filetype:image.mime
        }})
        console.log(res.data.signS3);
        setImageUrl(res.data.signS3.url);  
        const xhr = new XMLHttpRequest()
        xhr.open('PUT', res.data.signS3.signedRequest)
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log('Image successfully uploaded to S3')
            } else {
              console.log('Error while sending the image to S3')
            }
          }
        }
        xhr.setRequestHeader('Content-Type', response.type)
        xhr.send({uri: image.path, type: image.mime, name:filename})
      }
      await addreviewmutation({
        variables: {
          postid: postid,
          userid: data.me,
          username: 'nithin',
          rating: rating,
          comment: reviewvalue,
        },
       
      });
      await addingphoto({
        variables:{
          postid:postid,
          imgurl:imageurl
        }
      })
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View>
          <Image
            style={styles.image}
            source={require('../assets/netflix.png')}
          />

          <View style={styles.description}>
            <Text style={{fontWeight: 'bold', marginBottom: 8, marginTop: 5}}>
              {title}
            </Text>

            <Text>About</Text>
            <View style={styles.descriptioncontainer}>
              <Text style={{flex: 5}}>{description}</Text>
              <View style={{flexDirection: 'row', flex: 1}}>
                <Image
                  source={require('../assets/star.png')}
                  style={styles.star}
                />
                <Text>{postRating}/5</Text>
              </View>
            </View>
          </View>
          {addreview === false && (
            <View
              style={{
                marginTop: 5,
                paddingTop: 15,
                borderTopWidth: 0.5,
                borderTopColor: 'grey',
              }}>
              <TouchableOpacity onPress={() => setAddreview(true)}>
                <View
                  style={{
                    backgroundColor: '#f0505c',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 8,
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Add Review
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          {addreview === true && (
            <View
              style={{
                marginTop: 5,
                paddingTop: 15,
                borderTopWidth: 0.5,
                borderTopColor: 'grey',
                backgroundColor: '#fAfAfA',
              }}>
              <Text style={{fontWeight: 'bold'}}>Your Review</Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  marginBottom: 30,
                }}>
                {starsContainer}
              </View>
              <TouchableWithoutFeedback
                onPress={() => refRBSheet.current.open()}>
                <View style={styles.uploadphoto}>
                  {image != null && (
                    <Image
                      source={{uri: path}}
                      style={styles.backgroundimg2}></Image>
                  )}
                  {image === null && (
                    <View style={{alignItems: 'center'}}>
                      <ImageBackground
                        source={require('../assets/uploadimage.png')}
                        style={styles.backgroundimg}>
                        <Text style={{fontSize: 20}}>Upload a Picture</Text>
                      </ImageBackground>
                    </View>
                  )}
                </View>
              </TouchableWithoutFeedback>
              <View
                style={{
                  borderWidth: 0.3,
                  borderColor: 'grey',
                  padding: 5,
                }}>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="Type Review"
                  placeholderTextColor="grey"
                  numberOfLines={5}
                  multiline={true}
                  onChangeText={text => Setreviewvalue(text)}
                  style={{
                    height: 150,

                    textAlignVertical: 'top',
                  }}></TextInput>
              </View>
              <View style={{padding: 5, marginTop: 10, marginBottom: 5}}>
                <TouchableOpacity onPress={() => handlesubmit()}>
                  <View
                    style={{
                      backgroundColor: '#f0505c',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 8,
                    }}>
                    <Text style={{color: 'white'}}>SUBMIT</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom: 25,
              marginTop: 45,
            }}>
            <TouchableOpacity onPress={() => Setreview(true)}>
              {!review && <FaIcon name={'comment'} size={25} color="gray" />}
              {review && <FaIcon name={'comment'} size={25} color="tomato" />}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Setreview(false)}>
              {review && <FaIcon name={'image'} size={25} color="gray" />}
              {!review && <FaIcon name={'image'} size={25} color="tomato" />}
            </TouchableOpacity>
          </View>
          {review === true && (
            <FlatList
              data={listing}
              keyExtractor={listing => listing.id.toString()}
              renderItem={({item}) => (
                <Review
                  name={item.name}
                  stars={item.stars}
                  review={item.review}
                />
              )}></FlatList>
          )}
          {review === false && (
            <FlatList
              data={photos}
              keyExtractor={photo => photo.id.toString()}
              renderItem={({item}) => (
                <Image source={item.image} style={{width: '100%'}} />
              )}
            />
          )}
        </View>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <View>
            <TouchableWithoutFeedback onPress={uploadfromlib}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  alignItems: 'center',
                }}>
                <MaIcon name={'folder-image'} size={25} color="gray" />
                <Text style={styles.popuptext}> Upload from Gallery</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableNativeFeedback onPress={uploadfromcamera}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  alignItems: 'center',
                }}>
                <MaIcon name={'camera'} size={25} color="gray" />
                <Text style={styles.popuptext}> Take a photo</Text>
              </View>
            </TouchableNativeFeedback>
            <View
              style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}>
              <MaIcon name={'logout'} size={25} color="gray" />
              <Text style={styles.popuptext}> Cancel</Text>
            </View>
          </View>
        </RBSheet>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
  },
  description: {
    marginTop: 15,
    marginBottom: 15,
  },
  descriptioncontainer: {
    flexDirection: 'row',
    marginTop: 3,
  },
  star: {
    height: 15,
    width: 15,
    marginRight: 5,
  },
  uploadphoto: {
    marginHorizontal: 5,
    height: 200,
    backgroundColor: '#f3f3f3',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundimg: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    padding: 20,
  },
  backgroundimg2:{
    height:200,
    width:400,
    resizeMode: 'contain',
  }
});
