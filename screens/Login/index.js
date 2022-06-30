import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {authentication} from '../../Firebase/firebase-config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const Login = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showMessage, setShowMessage] = useState('');
  //   console.log(signInEmail,signInPassword)

  function signInUser() {
    signInWithEmailAndPassword(authentication, signInEmail, signInPassword)
      .then(re => {
        setIsSignedIn(true);
        setShowMessage('signed in successfully');
        setModalVisible(true);
      })
      .catch(re => {
        console.log(re);
        setShowMessage('username or password is incorrect');
        setModalVisible(true);
      });
  }

  function signOutUser() {
    signOut(authentication)
      .then(re => {
        setIsSignedIn(false);
        setShowMessage('Signed out successfully');
        setModalVisible(true);
        setSignInEmail('');
        setSignInPassword('');
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={styles.modalText}>USER-AUTHENTICATION USING FIREBASE 9.6.11</Text>
            <Text style={styles.modalText}>{showMessage}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <TextInput
        placeholder="username"
        style={styles.textinput}
        value={signInEmail}
        onChangeText={text => {
          setSignInEmail(text);
        }}
      />

      <TextInput
        placeholder="password"
        style={styles.textinput}
        value={signInPassword}
        onChangeText={text => {
          setSignInPassword(text);
        }}
      />

      {isSignedIn ? (
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={signOutUser}>
          <Text style={styles.textStyle}>Sign out</Text>
        </Pressable>
      ) : (
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={signInUser}>
          <Text style={styles.textStyle}>Sign in</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: 'pink',
    padding: 35,
    justifyContent: 'center',
    borderRadius:30
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginVertical:50
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
  buttonClose: {
    backgroundColor: 'red',
    marginHorizontal:25
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize:20
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize:20
  },
  textinput: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
    borderRadius: 30,
    paddingLeft: 20,
  },
});

export default Login;
