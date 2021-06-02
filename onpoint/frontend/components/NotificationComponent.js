import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';

function NotificationComponent({title, description}) {
  return (
    <View
      style={{
        marginTop: 10,

        marginLeft: 10,
        marginRight: 10,
      }}>
      <Text
        style={{
          marginBottom: 10,
          marginTop: 5,
          fontWeight: 'bold',
          color: 'black',
        }}>
        {title}
      </Text>
      <Text
        style={{
          marginTop: 5,
          paddingBottom: 10,
          color: 'grey',
          borderBottomWidth: 0.5,
          paddingBottom: 15,
        }}>
        {description}
      </Text>
    </View>
  );
}
export default NotificationComponent;
