import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {authentication} from './Firebase/firebase-config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showWarning, setShowWarning] = useState(false);

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

  function signInUser() {
    signInWithEmailAndPassword(authentication, signInEmail, signInPassword)
      .then(re => {
        setIsSignedIn(true);
        setShowWarning(true);
      })
      .catch(re => {
        console.log(re);
        Alert.alert('username or password incorrect');
      });
  }

  function signOutUser() {
    signOut(authentication)
      .then(re => {
        setIsSignedIn(false);
        Alert.alert('Signout successfully');
        setSignInEmail('');
        setSignInPassword('');
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <View style={styles.container}>
      <Modal visible={showWarning} animation="slide">
        {/* modal properties */}
        {/* onRequestClose={() => setShowWarning(false)} */}
        <View style={styles.modalView}>
          <Text>SIGNED-IN SUCCESSFULLY</Text>
          <TouchableOpacity
            style={styles.closebutton}
            onPress={() => setShowWarning(false)}>
            <Text style={styles.closebuttontext}>X</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
        {isSignedIn ? (
          <Button title="sign out" onPress={signOutUser} />
        ) : (
          <Button title="sign in" onPress={signInUser} />
        )}
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  underview: {
    marginVertical: 25,
  },
  thirdview: {
    backgroundColor: 'cyan',
    flex: 1,
  },
  modalView: {
    flex: 1,
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closebutton: {
    backgroundColor: 'black',
    maxWidth: 30,
    maxHeight: 35,
    minHeight: 30,
    minWidth: 30,
  },
  closebuttontext: {
    color: 'red',
    fontSize: 25,
    textAlign: 'center',
  },
});
