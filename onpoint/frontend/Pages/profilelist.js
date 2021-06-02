import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {logout, me,getuser} from '../Graphql/gql';
import {useMutation, useQuery,useLazyQuery} from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';



export default function Profilelist({navigation}) {
  const {data:userid_data, error:userid_error} = useQuery(me);
  const [getuserdetails,{data:userdetails}] = useLazyQuery(getuser)
  const [userlogout, res] = useMutation(logout);
  const logoutsession = async () => {
    alert('logout');
    await userlogout();
    if (res) {
      await AsyncStorage.removeItem('user_id').then(value =>
        navigation.replace(value === null ? 'Loginstack' : 'Tabstack'),
      );
    }
  };

  useEffect(()=>{
    if(userid_data)
    {
      getuserdetails({variables:{id:userid_data.me}})
    }
    if (userid_error) {
      console.log("error"+ userid_error)
    }
  },[userid_data, userid_error]);
  if(userdetails)
  {
    console.log(userdetails)
  }
  

  return (
    <SafeAreaView style={styles.container}>
      
       {userid_data && userdetails && (
        <ScrollView>
          <View style={styles.details}>
            <Text style={styles.name}>{userdetails.user.name}</Text>
            <View style={styles.details2}>
              <Text style={styles.phonenumber}>{userdetails.user.phone}</Text>
              <Text style={styles.mail}>{userdetails.user.email}</Text>
            </View>
          </View>
          <Text style={styles.profiletext}>YOUR PROFILE</Text>
          <View style={styles.lists}>
            <Pressable
              onPress={() => {
                navigation.navigate('EditProfile', {userid: userid_data.me,nameparam:userdetails.user.name,phonenumberparam:userdetails.user.phone,emailparam:userdetails.user.email});
              }}>
              <View style={styles.listitem}>
                <Image source={require('../assets/search.png')} />
                <Text style={styles.listtext}>Edit Profile</Text>
              </View>
            </Pressable>

            <TouchableOpacity
              onPress={() => navigation.navigate('Notifications')}>
              <View style={styles.listitem}>
                <Image source={require('../assets/search.png')} />
                <Text style={styles.listtext}>Notifications</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Aboutus')}>
              <View style={styles.listitem}>
                <Image source={require('../assets/search.png')} />
                <Text style={styles.listtext}>About</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('SendFeedback')}>
              <View style={styles.listitem}>
                <Image source={require('../assets/search.png')} />
                <Text style={styles.listtext}>Send Feedback</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.listitem}>
              <Image source={require('../assets/search.png')} />
              <Text style={styles.listtext}>Rate us on Play Store</Text>
            </View>
            <Pressable
              onPress={() => {
                logoutsession();
              }}>
              <Text style={styles.logout}>Log Out</Text>
            </Pressable>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

    overflow: 'hidden',
    alignContent: 'center',
    //alignItems:"center",
    paddingHorizontal: 5,
  },
  details: {
    paddingBottom: 25,
    marginTop: 10,
    borderBottomColor: '#838383',
    borderBottomWidth: 0.5,
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details2: {
    flexDirection: 'row',
    marginTop: 20,
  },
  phonenumber: {
    flex: 1,
  },
  mail: {
    flex: 2,
  },

  profiletext: {
    marginTop: 20,
    color: '#575757',
  },
  lists: {
    paddingTop: 15,
    paddingBottom: 15,

    borderBottomColor: '#838383',
  },
  lists2: {
    paddingTop: 15,
  },

  listitem: {
    flexDirection: 'row',
    marginBottom: 15,
    marginTop: 15,
  },
  listtext: {
    marginLeft: 10,
  },

  listtext2: {
    color: '#7C1C00',
    marginLeft: 10,
  },

  logout: {
    color: '#960000',
    fontWeight: 'bold',
    marginLeft: 30,
  },
});
