import React,{useState, useRef, } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  View,
  StatusBar,
  ScrollView,
  ImageBackground,
  Dimensions,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
} from 'react-native';
import {addingpost, s3SignMutation} from '../Graphql/gql';
import {useMutation, useQuery} from '@apollo/react-hooks';
import ImagePicker from 'react-native-image-crop-picker';
import MaIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import moment from 'moment';
import axios from 'axios';
export default function addreviewcomponent({navigation, route}) {
  const {userid} = route.params;
  const [addpost] = useMutation(addingpost);
  const [s3mutation, {data:response}]=useMutation(s3SignMutation);
  const [physicalWorld, setPhysicalWorld] = useState(true);
  const [virtualWorld, setVirtualWorld] = useState(false);
  const [entertainment, setEntertainment] = useState(false);
  const [products, setProducts] = useState(true);
  const [automobile, setAutomobile] = useState(false);
  const [services, setServices] = useState(false);
  const [more, setMore] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [path, setPath] = useState(null);
  const refRBSheet = useRef();
  const [imageurl, setImageUrl]=useState(null);
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
      includeBase64:true
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
  const handlesubmit = async () => {
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
    await addpost({
      variables: {
        userid: userid,
        title: title,
        description: description,
        category: 'Entertaiment',
        physical: physicalWorld,
        imageurl:imageurl
      },
    });
  };
  return (
    <ScrollView style={{backgroundColor:"#fff"}}>
      <View>
        <TextInput
          style={styles.logintextinput}
          required
          placeholder="Title"
          onChangeText={val => setTitle(val)}
        />
        <TextInput
          style={styles.logintextinput}
          required
          placeholder="Description"
          onChangeText={val => setDescription(val)}
        />
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
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 10,
            marginRight: 10,
            height: 50,
          }}>
          <TouchableOpacity
            onPress={() => {
              setVirtualWorld(true);
              setPhysicalWorld(false);
              setEntertainment(false);
              setProducts(true);
              setAutomobile(false);
              setServices(false);
              setMore(false);
            }}
            style={{width: '49%'}}>
            <View
              style={{
                flex: 1,
                borderColor: '#bbb',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 7,
                backgroundColor: virtualWorld ? '#f0505c' : '#FFFFFF',
              }}>
              <Text style={{color: virtualWorld ? '#FFFFFF' : '#000000'}}>
                Virtual World
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setVirtualWorld(false);
              setPhysicalWorld(true);
              setEntertainment(false);
              setProducts(true);
              setAutomobile(false);
              setServices(false);
              setMore(false);
            }}
            style={{width: '49%'}}>
            <View
              style={{
                flex: 1,
                borderColor: '#bbb',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 7,
                backgroundColor: physicalWorld ? '#f0505c' : '#FFFFFF',
              }}>
              <Text style={{color: physicalWorld ? '#FFFFFF' : '#000000'}}>
                Physical World
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {virtualWorld && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 15,
            }}>
            <TouchableOpacity
              onPress={() => {
                setEntertainment(false);
                setProducts(true);
                setAutomobile(false);
                setServices(false);
                setMore(false);
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/product.png')}
                  style={products ? styles.imageActive : styles.image}
                />
                <Text style={products ? styles.textActive : styles.text}>
                  Products
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setEntertainment(false);
                setProducts(false);
                setAutomobile(false);
                setServices(true);
                setMore(false);
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../assets/service.jpeg')}
                  style={services ? styles.imageActive : styles.image}
                />
                <Text style={services ? styles.textActive : styles.text}>
                  Services
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setEntertainment(true);
                setProducts(false);
                setAutomobile(false);
                setServices(false);
                setMore(false);
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../assets/entertainment.png')}
                  style={entertainment ? styles.imageActive : styles.image}
                />
                <Text style={entertainment ? styles.textActive : styles.text}>
                  Entertainment
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setEntertainment(false);
                setProducts(false);
                setAutomobile(false);
                setServices(false);
                setMore(true);
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../assets/more.png')}
                  style={more ? styles.imageActive : styles.image}
                />
                <Text style={more ? styles.textActive : styles.text}>More</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {physicalWorld && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 15,
            }}>
            <TouchableOpacity
              onPress={() => {
                setEntertainment(false);
                setProducts(true);
                setAutomobile(false);
                setServices(false);
                setMore(false);
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/product.png')}
                  style={products ? styles.imageActive : styles.image}
                />
                <Text style={products ? styles.textActive : styles.text}>
                  Products
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setEntertainment(false);
                setProducts(false);
                setAutomobile(false);
                setServices(true);
                setMore(false);
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../assets/service.jpeg')}
                  style={services ? styles.imageActive : styles.image}
                />
                <Text style={services ? styles.textActive : styles.text}>
                  Services
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setEntertainment(true);
                setProducts(false);
                setAutomobile(false);
                setServices(false);
                setMore(false);
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../assets/entertainment.png')}
                  style={entertainment ? styles.imageActive : styles.image}
                />
                <Text style={entertainment ? styles.textActive : styles.text}>
                  Entertainment
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setEntertainment(false);
                setProducts(false);
                setAutomobile(false);
                setServices(false);
                setMore(true);
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../assets/more.png')}
                  style={more ? styles.imageActive : styles.image}
                />
                <Text style={more ? styles.textActive : styles.text}>More</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity onPress={() => handlesubmit()}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                width: '90%',
                height: 50,
                marginTop: 20,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f0505c',
              }}>
              <Text style={{color: 'white'}}>Add Component</Text>
            </View>
          </View>
        </TouchableOpacity>
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
  );
}

const styles = StyleSheet.create({
  logintextinput: {
    margin: 10,
    width: 380,
    backgroundColor: '#E0E5EB',
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
  },
  imageActive: {
    height: 40,
    width: 40,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
    borderColor: 'yellow',
    borderWidth: 1,
  },
  text: {
    color: '#000000',
  },
  textActive: {
    color: '#f0505c',
  },
  uploadphoto: {
    marginHorizontal: 5,
    height: 200,
    backgroundColor: '#f3f3f3',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:10
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
