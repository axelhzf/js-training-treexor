import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View, Image} from 'react-native';

class ReactNativeExample extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: "http://axelhzf.com/talk-react-at-treexor/images/logo.png"}} />
        <Text style={styles.text}>
          Hi treexor
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000407'
  },
  image: {
    width: 300,
    height: 379,
    backgroundColor: "transparent"
  },
  text: {
    fontSize: 40,
    textAlign: 'center',
    color: "#A7C829"
  }
});

AppRegistry.registerComponent('ReactNativeExample', () => ReactNativeExample);