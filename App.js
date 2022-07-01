import {StyleSheet, Text, View,StatusBar} from 'react-native';
import React from 'react';
import Login from './screens/Login';

import Signup from './screens/Signup';
const App = () => {
  return (
    <>
    <StatusBar hidden />
      <View style={styles.container}>
        <Signup />
        <View style={styles.titleView}>
          <Text style={styles.title}>USER-AUTHENTICATION USING FIREBASE 9.6.11</Text>
        </View>
        <Login />
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:30,
    backgroundColor:"black"
  },
  titleView:{
    flex:1,
    backgroundColor:"black",
    justifyContent:"space-evenly"
  },
  title:{
    textAlign:"center",
    fontSize:20,
    color:"white",
    fontFamily:"TitanOne-Regular"
  }
});
