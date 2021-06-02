import React, {Component} from 'react';
import {StyleSheet, Text, SafeAreaView, Image, View} from 'react-native';

export default function ReviewComponent({stars, name, review}) {
  var starsContainer = [];
  for (let i = 0; i < 5; i++) {
    if (i < stars) {
      starsContainer.push(
        <Image
          source={require('../assets/star.png')}
          style={styles.starImg}
          key={i}
        />,
      );
    } else {
      starsContainer.push(
        <Image
          source={require('../assets/stargray.png')}
          style={styles.starImg}
          key={i}
        />,
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.reviewContainer}>{starsContainer}</View>
      <Text style={styles.text}>{review}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    overflow: 'hidden',
    alignContent: 'center',
    //alignItems:"center",
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 10,
    borderBottomWidth: 0.5,
    paddingBottom: 15,
  },

  name: {
    fontWeight: 'bold',
    fontSize: 15,
  },

  reviewContainer: {
    flexDirection: 'row',
  },

  starImg: {
    height: 15,
    width: 15,
    margin: 2,
  },

  text: {
    fontSize: 13,
  },
});
