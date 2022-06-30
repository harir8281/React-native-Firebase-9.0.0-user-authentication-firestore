import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Login from './screens/Login';

import Signup from './screens/Signup';
const App = () => {
  return (
    <>
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
    padding:20,
  },
  titleView:{
    flex:1,
    padding:10,
    backgroundColor:"white",
    justifyContent:"space-evenly"
  },
  title:{
    textAlign:"center",
    fontSize:20,
    color:"red",
    fontWeight:"bold"
  }
});
