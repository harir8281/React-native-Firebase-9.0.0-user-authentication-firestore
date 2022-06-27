import {StyleSheet, Text, View, TextInput, Button,Alert} from 'react-native';
import React, {useState} from 'react';

import {authentication} from './Firebase/firebase-config';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  function registerUser() {
    createUserWithEmailAndPassword(authentication, email, password)
      .then(re => {
        console.log(re);
        setIsSignedIn(true);
        Alert.alert("user registered")
      })
      .catch(re => {
        console.log(re);
      });
  }

  function signInUser() {
    signInWithEmailAndPassword(authentication,signInEmail,signInPassword)
    .then((re)=>{
      setIsSignedIn(true)
      Alert.alert("signin successfully")
    })
    .catch((re)=>{
      console.log(re)
      Alert.alert("username or password incorrect")
    })
  }

  function signOutUser()
  {
    signOut(authentication)
    .then((re)=>{
      setIsSignedIn(false)
      Alert.alert("Signout successfully")
    })
    .catch((err)=>{
      console.log(err)
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
      <View style={styles.underview}>
        <TextInput
          placeholder="username"
          value={signInEmail}
          onChangeText={text => {
            setSignInEmail(text);
          }}
        />

        <TextInput
          placeholder="password"
          value={signInPassword}
          onChangeText={text => {
            setSignInPassword(text);
          }}
        />
        {isSignedIn ?
        <Button title="sign out" onPress={signOutUser} />
        :
        <Button title="sign in" onPress={signInUser} />
        }
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
  },
  underview: {
    marginVertical: 50,
  },
});
