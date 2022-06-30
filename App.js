import {StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';
import React, {useState} from 'react';
import {authentication} from './Firebase/firebase-config';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
} from 'firebase/firestore/lite';

import {db} from './Firebase/firebase-config';

const App = () => {
  //user authentication code
  // const [isSignedIn, setIsSignedIn] = useState(false);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const [signInEmail, setSignInEmail] = useState('');
  // const [signInPassword, setSignInPassword] = useState('');

  //usestate for firestore
  const [cityName, setCityName] = useState('');
  const [stateName, setStateName] = useState('');
  const [email, setEmail] = useState('');

  // function registerUser() {
  //   createUserWithEmailAndPassword(authentication, email, password)
  //     .then(re => {
  //       console.log(re);
  //       setIsSignedIn(true);
  //       Alert.alert("user registered")
  //     })
  //     .catch(re => {
  //       console.log(re);
  //     });
  // }

  // function signInUser() {
  //   signInWithEmailAndPassword(authentication,signInEmail,signInPassword)
  //   .then((re)=>{
  //     setIsSignedIn(true)
  //     Alert.alert("signin successfully")
  //   })
  //   .catch((re)=>{
  //     console.log(re)
  //     Alert.alert("username or password incorrect")
  //   })
  // }

  // function signOutUser()
  // {
  //   signOut(authentication)
  //   .then((re)=>{
  //     setIsSignedIn(false)
  //     Alert.alert("Signout successfully")
  //     setSignInEmail('')
  //     setSignInPassword('')

  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //   })
  // }

  //firstore code

  async function getData() {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    console.log(cityList);
  }

  async function setData() {
    // Add a new document in collection "cities"
    await setDoc(doc(db, 'cities', email), {
      city_name: cityName,
      state: stateName,
    });

  }

  return (
    <View style={styles.firestoreView}>
      <Button title="Get data" onPress={getData} color="black" />
      <View style={styles.inputView}>
        <TextInput
          placeholder="City name"
          onChangeText={text => setCityName(text)}
        />
        <TextInput
          placeholder="State"
          onChangeText={text => setStateName(text)}
        />
        <TextInput placeholder="Email" onChangeText={text => setEmail(text)} />
      </View>
      <Button title="set data" onPress={setData} color="#556b2f" />
    </View>
    // <View style={styles.container}>
    //   <TextInput
    //     placeholder="username"
    //     value={email}
    //     onChangeText={text => {
    //       setEmail(text);
    //     }}
    //   />

    //   <TextInput
    //     placeholder="password"
    //     value={password}
    //     onChangeText={text => {
    //       setPassword(text);
    //     }}
    //   />
    //   <Button title="register" onPress={registerUser} />
    //   <View style={styles.underview}>
    //     <TextInput
    //       placeholder="username"
    //       value={signInEmail}
    //       onChangeText={text => {
    //         setSignInEmail(text);
    //       }}
    //     />

    //     <TextInput
    //       placeholder="password"
    //       value={signInPassword}
    //       onChangeText={text => {
    //         setSignInPassword(text);
    //       }}
    //     />
    //     {isSignedIn ?
    //     <Button title="sign out" onPress={signOutUser} />
    //     :
    //     <Button title="sign in" onPress={signInUser} />
    //     }
    //   </View>
    //   <View style={styles.thirdview} >
    //   </View>
    // </View>
  );
};

export default App;

const styles = StyleSheet.create({
  // container: {
  //   padding: 20,
  //   flex: 1,
  // },
  // underview: {
  //   marginVertical: 25,
  // },
  // thirdview:{
  //   backgroundColor:"cyan",
  //   flex:1
  // }

  firestoreView: {
    padding: 30,
    flex: 1,
    backgroundColor: '#f0e68c',
  },
  inputView: {
    padding: 10,
  },
});
