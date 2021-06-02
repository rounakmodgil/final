import React, { useEffect } from 'react';
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
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {me,getuser,getallposts} from '../Graphql/gql';
import {useMutation, useQuery,useLazyQuery} from '@apollo/react-hooks';

import Card from '../components/card';

export default function profilepage({navigation}) {
  const {data:userid, loading,error:userid_error} = useQuery(me);
  const [getuserdetails,{data:userdetails}] = useLazyQuery(getuser);
  const {data:posts_data,loading:posts_loading,error:posts_error} = useQuery(getallposts);
  const windowWidth = Dimensions.get('window').width;
  useEffect(()=>{
    if(userid)
    {
      getuserdetails({variables:{id:userid.me}})
    }
    if (userid_error) {
      console.log("error"+ userid_error)
    }
  },[userid, userid_error]);

  return (
    <SafeAreaView style={styles.container}>
      {userid && userdetails && posts_data && (     
      <>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          zIndex:100,
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Add Review', {userid: userid.me})
          }>
          <View
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              backgroundColor: '#f0505c',

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>+</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={{borderColor: '#bbb', borderWidth: 1}}>
          <ImageBackground
            style={{
              height: 250,
              width: '100%',
              resizeMode: 'contain',
            }}
            source={require('../assets/whatsnew.png')}></ImageBackground>
        </View>
        <View style={{height: 40}}>
          <Image
            style={{
              position: 'absolute',
              bottom: 0,
              borderColor: '#CB202D',
              borderWidth: 2,
              left: windowWidth / 2 - 48,
              height: 80,
              width: 80,
              borderRadius: 100,
              resizeMode: 'cover',
            }}
            source={require('../assets/user.jpeg')}
          />
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 10,
            marginRight: 10,
            marginBottom:20,
          }}>
          <View style={{borderColor: '#bbb', justifyContent: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>{userdetails.user.name}</Text>
            <Text>{userdetails.user.email}</Text>
          </View>
          <View
            style={{
              borderColor: '#bbb',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', color: '#CB202D'}}>{userdetails.user.Posts.length} Posts</Text>
          </View>
        </View>
        {userdetails.user.Posts.length===0 && (
          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginLeft: 60,
          }}>
          <ImageBackground
            style={{
              height: 280,
              width: '54%',
              resizeMode: 'contain',
            }}
            source={require('../assets/nothing.png')}></ImageBackground>
        </View>
        )}
        {posts_data && (
          posts_data.posts.map((item)=>{
            if(item.userid===userid.me)
            {
              return(
                <Card
                title={item.title}
                description={item.description}
                rating={2}
                location={item.location}
                physical={item.physical}
                navigation={navigation}
                postId={item.id}
                image={require('../assets/cover.png')}
                key={item.id}
                profile={true}
              />
              );
            }
          })
        )}
        
        </ScrollView>
        </>
        )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: StatusBar.currentHeight,
    overflow: 'hidden',
  },
});
