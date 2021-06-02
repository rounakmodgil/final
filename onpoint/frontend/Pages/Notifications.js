import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';

import NotificationComponent from '../components/NotificationComponent';

import {getnotifications} from '../Graphql/gql';
import {useMutation, useQuery} from '@apollo/react-hooks';

const data1 = [
  {
    id: 1,
    title: 'helllo',
    description: 'sjhfbjrbjsbfsbdkfbsfbriurf',
  },
  {
    id: 2,
    title: 'helllo',
    description: 'sjhfbjrbjsbfsbdkfbsfbriurf',
  },
  {
    id: 3,
    title: 'helllo',
    description: 'sjhfbjrbjsbfsbdkfbsfbriurf',
  },
];

function Notifications() {
  const {data, loading} = useQuery(getnotifications);
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView>
        <FlatList
          data={data1}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            return (
              <NotificationComponent
                title={item.title}
                description={item.description}
              />
            );
          }}></FlatList>
        {data && (
          <FlatList
            data={data.notifications}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => {
              return (
                <NotificationComponent
                  title={item.header}
                  description={item.description}
                />
              );
            }}></FlatList>
        )}
      </ScrollView>
    </View>
  );
}
export default Notifications;
