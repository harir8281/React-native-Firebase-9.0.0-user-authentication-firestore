import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import React, {useState} from 'react';

import {authentication} from './Firebase/firebase-config';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 function registerUser()
 {
  createUserWithEmailAndPassword(authentication,email,password)
  .then((re)=>{
    console.log(re)
  })
  .catch((re)=>{
    console.log(re)
  })
 }

  
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="username"
        value={email}
        onChangeText={text => {
          setEmail(text);
        }}
      />
      
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={text => {
          setPassword(text);
        }}
      />
      <Button title="register" onPress={registerUser} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
  },
});
