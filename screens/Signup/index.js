import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Pressable
} from 'react-native';
import React, {useState} from 'react';
import { authentication } from '../../Firebase/firebase-config';
import {
  createUserWithEmailAndPassword,
} from 'firebase/auth';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function registerUser() {
    createUserWithEmailAndPassword(authentication, email, password)
      .then(re => {
        console.log(re);
        Alert.alert('Firebase Authentication', 'User registered', [
          {
            text: 'OK',
            onPress: () => {
              setEmail('');
              setPassword('');
            },
          },
        ]);
      })
      .catch(re => {
        // console.log(re.code);
        Alert.alert(re.code);
        // var error=JSON.stringify(re)
        // console.log(error)
      });
  }


  return (
    <View style={styles.container}>
      <TextInput
        placeholder="username"
        style={styles.textinput}
        value={email}
        onChangeText={text => {
          setEmail(text);
        }}
      />

      <TextInput
        placeholder="password"
        style={styles.textinput}

        value={password}
        onChangeText={text => {
          setPassword(text);
        }}
      />
      <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={registerUser}>
          <Text style={styles.textStyle}>Register</Text>
        </Pressable>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor:"#00fa9a",
    borderRadius:30,
  },
  textinput: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
    borderRadius: 30,
    paddingLeft: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 15,
  },
  buttonOpen: {
    backgroundColor: 'black',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize:20
  }
});
