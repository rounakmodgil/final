import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {me, editprofilemutation} from '../Graphql/gql';
import {useMutation, useQuery} from '@apollo/react-hooks';

function ProfileEdit({navigation, route}) {
  const {userid,nameparam,phonenumberparam,emailparam} = route.params;

  const [changeprofiledetails] = useMutation(editprofilemutation);
  const [name, setName] = useState(nameparam);
  const [email, setEmail] = useState(emailparam);
  const [phonenumber, setPhonenumber] = useState(phonenumberparam);
  const password = 'abcd';
  const [newpassword, setNewpassword] = useState('');
  const [editprofile, setEditprofile] = useState(true);
  const handleupdate = async () => {
    if (editprofile) {
      const res = await changeprofiledetails({
        variables: {
          userid: userid,
          name: name,
          phone: phonenumber,
        },
      });
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={{backgroundColor: 'white'}}>
        <View
          style={{
            padding: 5,
            margin: 5,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity onPress={() => setEditprofile(true)}>
            <Text>Edit Profile Details</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setEditprofile(false)}>
            <Text>Change Password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainWrapper}>
          <View>
            {editprofile === true && (
              <>
                <View style={styles.inputContainer}>
                  <Text style={{color: '#838383'}}>Name</Text>
                  <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={val => setName(val)}></TextInput>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={{color: '#838383'}}>Phonenumber</Text>
                  <TextInput
                    style={styles.input}
                    value={phonenumber}
                    onChangeText={val => setPhonenumber(val)}></TextInput>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={{color: '#838383'}}>Email</Text>
                  <TextInput style={styles.input2} value={email}></TextInput>
                </View>
              </>
            )}
            {editprofile === false && (
              <>
                <View style={styles.inputContainer}>
                  <Text style={{color: '#838383'}}>Current Password</Text>
                  <TextInput style={styles.input}></TextInput>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={{color: '#838383'}}>New Password</Text>
                  <TextInput style={styles.input}></TextInput>
                </View>
              </>
            )}
          </View>
          <TouchableOpacity onPress={() => handleupdate()}>
            <View
              style={{
                alignItems: 'center',
                marginTop: 30,
              }}>
              <View style={styles.savechangescontainer}>
                <Text
                  style={{
                    fontSize: 20,
                    paddingHorizontal: 25,
                    paddingVertical: 10,
                    color: '#ffffff',
                  }}>
                  Save Changes
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfileEdit;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainWrapper: {
    margin: 10,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 16,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  input: {
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 1,
  },
  input2: {
    backgroundColor: '#eaeaea',
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 1,
  },
  inputContainer: {
    marginBottom: 10,
    marginTop: 25,
  },
  savechangescontainer: {
    backgroundColor: '#f0505c',
    borderRadius: 30,
  },
});
