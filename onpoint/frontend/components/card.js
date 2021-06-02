// import React, {useState, useCallback, useEffect} from 'react';
// import {
//   Alert,
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   Linking,
//   Image,
//   TouchableWithoutFeedback,
//   Pressable,
//   Modal,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import MaIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Entypo from 'react-native-vector-icons/Entypo';

// const Card = ({
//   index,
//   postId,
//   userId,
//   description,
//   navigation,
//   author,
//   address,
//   location,
//   category,
//   created,
//   imgurl,
//   upvotes,
//   downvotes,
//   deleteButton,
// }) => {
//   const votes = 10;
//   const [textShown, setTextShown] = useState(false); //To show ur remaining Text
//   const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
//   const [votestate, setVoteState] = useState(votes);
//   const [upvotecolor, setUpVoteColor] = useState('gray');
//   const [downvotecolor, setDownVoteColor] = useState('gray');
//   const [bookmark, setBookMark] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalVisible2, setModalVisible2] = useState(false);
//   const [imageSource, setImageSource] = useState(null);
//   const [up, setUp] = useState(null);
//   const [down, setDown] = useState(null);
//   const [user, setUser] = useState(null);
//   const [voteCount, setVoteCount] = useState(upvotes - downvotes);
//   const submitUpvote = async () => {
//     try {
//       setUp(10);
//       setVoteCount(voteCount + 1);
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   const submitDownvote = async () => {
//     try {
//       setDown(10);
//       setVoteCount(voteCount - 1);
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   const removeUpvote = async () => {
//     try {
//       setVoteCount(voteCount - 1);
//       setUp(null);
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   const removeDownvote = async () => {
//     try {
//       setVoteCount(voteCount + 1);
//       setDown(null);
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   const onUpvote = async () => {
//     if (!user) {
//       return;
//     }
//     if (!up) {
//       if (down) {
//         await removeDownvote();
//       }
//       await submitUpvote();
//     } else {
//       await removeUpvote();
//     }
//   };
//   const onDownvote = async () => {
//     if (!user) {
//       return;
//     }
//     if (!down) {
//       if (up) {
//         await removeUpvote();
//       }
//       await submitDownvote();
//     } else {
//       await removeDownvote();
//     }
//   };
//   const getImage = async () => {};
//   useEffect(() => {}, []);

//   const toggleNumberOfLines = () => {
//     //To toggle the show text or hide it
//     setTextShown(!textShown);
//   };

//   const onTextLayout = useCallback(e => {
//     setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
//     // console.log(e.nativeEvent);
//   }, []);

//   const bookmarkfun = () => {
//     setBookMark(!bookmark);
//   };
//   const upvote = () => {
//     setDownVoteColor('gray');
//     if (upvotecolor === '#1e6485') {
//       setUpVoteColor('gray');
//     } else {
//       setUpVoteColor('#1e6485');
//     }
//     setVoteState(votes + 1);
//   };
//   const downvote = () => {
//     setUpVoteColor('gray');
//     if (downvotecolor === '#1e6485') {
//       setDownVoteColor('gray');
//     } else {
//       setDownVoteColor('#1e6485');
//     }
//     setVoteState(votes - 1);
//   };
//   const reportaccepted = () =>
//     Alert.alert('Reported Post', 'We have recorded your response', [
//       {
//         text: 'Cancel',
//         onPress: () => console.log('Cancel Pressed'),
//         style: 'cancel',
//       },
//       {text: 'OK', onPress: () => console.log('OK Pressed')},
//     ]);
//   return (
//     <View style={styles.container}>
//       <View style={styles.headerWrapper}>
//         <View style={styles.headerContainer}>
//           <View style={styles.userimagecontainer}>
//             <Icon name={'person'} size={30} />
//           </View>
//           <View>
//             <Text style={{fontSize: 12, color: 'gray'}}>@{author}</Text>
//             <Text style={{fontSize: 14, marginTop: 1}}>{created}</Text>
//             <Text style={{fontSize: 14, marginTop: 1}}>{address}</Text>
//           </View>
//         </View>
//         <Pressable onPress={() => setModalVisible(true)}>
//           <MaIcon name={'dots-vertical'} size={25} />
//         </Pressable>
//       </View>
//       <View style={styles.postcontainer}>
//         {imageSource && (
//           <Image source={imageSource} style={{height: '100%', width: '100%'}} />
//         )}
//       </View>
//       <View style={styles.footerContainer}>
//         <View style={styles.footerSubContainer}>
//           <View style={{flexDirection: 'row', alignItems: 'center'}}>
//             <TouchableWithoutFeedback onPress={onUpvote}>
//               <MaIcon
//                 name={'arrow-up-bold'}
//                 size={25}
//                 color={up ? '#1e6485' : 'gray'}
//               />
//             </TouchableWithoutFeedback>
//             <Text style={{marginRight: 5}}>{voteCount} </Text>
//             <TouchableWithoutFeedback onPress={onDownvote}>
//               <MaIcon
//                 name={'arrow-down-bold'}
//                 size={25}
//                 color={down ? '#1e6485' : 'gray'}
//               />
//             </TouchableWithoutFeedback>
//             <Pressable
//               onPress={() => {
//                 navigation.navigate('Map', {
//                   lat: location.latitude,
//                   long: location.longitude,
//                 });
//               }}
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 marginLeft: 12,
//               }}>
//               <Entypo name={'location-pin'} size={22} color="#444" />
//               <Text style={{paddingLeft: 2, color: '#444'}}>View Location</Text>
//             </Pressable>
//           </View>
//           <Pressable onPress={bookmarkfun}>
//             {bookmark ? (
//               <MaIcon name={'bookmark'} size={25} />
//             ) : (
//               <MaIcon name={'bookmark-outline'} size={25} />
//             )}
//           </Pressable>
//         </View>
//         <View style={{marginTop: 10}}>
//           <Text
//             onTextLayout={onTextLayout}
//             numberOfLines={textShown ? undefined : 2}
//             style={{lineHeight: 21}}>
//             {description}
//           </Text>

//           {lengthMore ? (
//             <Text
//               onPress={toggleNumberOfLines}
//               style={{lineHeight: 21, marginTop: 10}}>
//               {textShown ? 'Read less...' : 'Read more...'}
//             </Text>
//           ) : null}
//         </View>
//       </View>
//       <View style={styles.centeredView}>
//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => {
//             setModalVisible(!modalVisible);
//           }}>
//           <View style={styles.centeredView}>
//             <View style={styles.modalView}>
//               <Pressable
//                 onPress={() => {
//                   setModalVisible(!modalVisible);
//                   setModalVisible2(true);
//                 }}>
//                 <Text style={styles.modalText}>Report Post</Text>
//               </Pressable>
//               <Pressable
//                 style={[styles.button, styles.buttonClose]}
//                 onPress={() => setModalVisible(!modalVisible)}>
//                 <Text style={styles.textStyle}>Cancel</Text>
//               </Pressable>
//             </View>
//           </View>
//         </Modal>
//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible2}
//           onRequestClose={() => {
//             setModalVisible(!modalVisible2);
//           }}>
//           <View style={styles.centeredView}>
//             <View style={styles.modalView}>
//               <Pressable
//                 onPress={() => {
//                   setModalVisible2(!modalVisible2);
//                   reportaccepted();
//                 }}>
//                 <Text style={styles.modalText}>Inappropriate Post</Text>
//               </Pressable>
//               <Text style={styles.modalText}>Spam Post</Text>
//               <Pressable
//                 style={[styles.button, styles.buttonClose]}
//                 onPress={() => setModalVisible2(!modalVisible2)}>
//                 <Text style={styles.textStyle}>Cancel</Text>
//               </Pressable>
//             </View>
//           </View>
//         </Modal>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 5,
//     paddingVertical: 7,
//     marginVertical: 7,
//     elevation: 1,
//     backgroundColor: '#fff',
//   },
//   userimagecontainer: {
//     height: 40,
//     width: 40,
//     borderRadius: 20,
//     marginRight: 10,
//     backgroundColor: '#dcdbdc',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     marginBottom: 7,
//     fontSize: 13,
//     alignItems: 'center',
//   },
//   headerWrapper: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   postcontainer: {
//     height: 400,
//     width: '100%',
//     backgroundColor: 'gray',
//   },
//   footerSubContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   headerLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   headerRight: {},
//   bottomContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 12,
//   },
//   centerAlign: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   title: {
//     fontSize: 17,
//     fontFamily: 'OpenSans-Bold',
//   },
//   score: {
//     marginHorizontal: 5,
//     fontFamily: 'OpenSans-SemiBold',
//   },
//   commentIcon: {
//     marginBottom: -3,
//   },
//   commentText: {
//     marginLeft: 3,
//     fontFamily: 'OpenSans-SemiBold',
//   },
//   regularFont: {
//     fontFamily: 'OpenSans-Regular',
//   },
//   italicFont: {
//     fontFamily: 'OpenSans-Italic',
//   },
//   dateText: {
//     fontFamily: 'OpenSans-Regular',
//     fontSize: 12,
//   },
//   link: {
//     color: '#0064bd',
//     fontWeight: 'bold',
//   },

//   //njkjknjknjknjknjkljkjjkbjkjjnjlnkjnjknjknjnkjnnjknjkjnnkjjknjkj

// centeredView: {
//   flex: 1,
//   justifyContent: 'center',
//   alignItems: 'center',
//   marginTop: 22,
// },
// modalView: {
//   margin: 20,
//   backgroundColor: '#eee',
//   borderRadius: 20,
//   padding: 35,
//   alignItems: 'center',
//   shadowColor: '#000',
//   shadowOffset: {
//     width: 0,
//     height: 2,
//   },
//   shadowOpacity: 0.25,
//   shadowRadius: 4,
//   elevation: 5,
// },
// button: {
//   borderRadius: 20,
//   padding: 10,
//   paddingHorizontal: 15,
//   elevation: 2,
// },
// buttonOpen: {
//   backgroundColor: '#F194FF',
// },
// buttonClose: {
//   backgroundColor: '#1e6485',
// },
// textStyle: {
//   color: 'white',
//   fontWeight: 'bold',
//   textAlign: 'center',
// },
// modalText: {
//   marginBottom: 20,
//   textAlign: 'center',
//   fontSize: 16,
// },
// });

// export default Card;

import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  View,
  Pressable,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
export default function Card({
  postId,
  userId,
  title,
  description,
  navigation,
  author,
  location,
  category,
  imgurl,
  rating,
  image,
  physical,
  profile
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"

  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);

  return (
    <View style={styles.card}>
      <View>
        <View style={styles.headerWrapper}>
          <View style={styles.headerContainer}>
            <View style={styles.userimagecontainer}>
              {physical && (
                <FaIcon name={'user-alt'} size={20} color={'black'} />
              )}
              {!physical && <FaIcon name={'robot'} size={20} color={'black'} />}
            </View>
            <View>
              <Text>{title}</Text>
            </View>
          </View>
          {profile===false &&
          <Pressable onPress={() => setModalVisible(true)}>
            <MaIcon name={'dots-vertical'} size={25} />
          </Pressable>
}
        </View>
        {profile===false &&
        <Pressable
          onPress={() => {
            navigation.navigate('ReviewPage', {
              postid: postId,
              title: title,
              description: description,
              postRating: rating,
            });
          }}>
          <Image source={image} style={styles.image} />
        </Pressable>
        }
        {profile===true && <Pressable
          onPress={() => {
            navigation.navigate('AddReviewComponent', {
              postid: postId,
              title: title,
              description: description,
              postRating: rating,
            });
          }}>
          <Image source={image} style={styles.image} />
        </Pressable>}
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              flex: 1,
            }}>
            <View style={{paddingRight: 10}}>
              <Text
                onTextLayout={onTextLayout}
                numberOfLines={textShown ? undefined : 2}
                style={{lineHeight: 20}}>
                {description}
              </Text>

              {lengthMore ? (
                <Text
                  onPress={toggleNumberOfLines}
                  style={{lineHeight: 20, marginTop: 5}}>
                  {textShown ? 'Read less...' : 'Read more...'}
                </Text>
              ) : null}
            </View>
          </View>
          <View
            style={{
              alignContent: 'flex-end',
              //justifyContent:"flex-end",
              alignItems: 'flex-end',
              right: 15,
              top: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={require('../assets/star.png')}
                style={{
                  width: 15,
                  height: 15,
                  marginRight: 5,
                }}
              />
              <Text>{rating}/5.0</Text>
            </View>
            <Text style={{fontSize: 13, color: 'gray'}}>30 reviews</Text>
          </View>
        </View>

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable onPress={() => {}}>
                  <Text style={styles.modalText}>Save Post</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setModalVisible2(true);
                  }}>
                  <Text style={styles.modalText}>Report Post</Text>
                </Pressable>

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible2}
            onRequestClose={() => {
              setModalVisible(!modalVisible2);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable
                  onPress={() => {
                    setModalVisible2(!modalVisible2);
                    reportaccepted();
                  }}>
                  <Text style={styles.modalText}>Inappropriate Post</Text>
                </Pressable>
                <Text style={styles.modalText}>Spam Post</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible2(!modalVisible2)}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </View>
      {physical && (
        <Pressable
          onPress={() => {
            navigation.navigate('Map', {
              lat: location.latitude,
              long: location.longitude,
            });
          }}>
          <View
            style={{
              height: 25,
              width: '100%',
              backgroundColor: 'tomato',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Entypo name={'location-pin'} size={22} color="#fff" />
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              {' '}
              View Location
            </Text>
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    minHeight: 100,
  },
  card: {
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 2,
  },
  profile: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 7,
    marginLeft: 5,
    marginTop: 5,
    fontSize: 13,
    alignItems: 'center',
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userimagecontainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#dcdbdc',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#eee',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 15,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#f0505c',
  },
  buttonClose: {
    backgroundColor: '#f0505c',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
  },
});
