import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
} from 'firebase/firestore/lite';

import {db} from './Firebase/firebase-config';

const App = () => {
  const [cityName, setCityName] = useState('');
  const [stateName, setStateName] = useState('');
  const [email, setEmail] = useState('');
  const [userDetails, setUserDetails] = useState({});

  //send data to firestore
  async function setData() {
    await setDoc(doc(db, 'cities', email), {
      city_name: cityName,
      state: stateName,
    });
  }
  //get data from firestore
  async function getData() {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    const myJSON = JSON.stringify(cityList); //object to string
    setUserDetails(cityList);
  }

  useEffect(() => {
    getData();
  });

  // console.log(userDetails)

  function renderView(itemData) {
    return (
      <ScrollView>
        <View style={styles.renderview}>
          <Text style={styles.renderText}>
            {itemData.item.city_name.toUpperCase()},
          </Text>
          <Text style={styles.addresstext}>
            {itemData.item.state.toUpperCase()}
          </Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.firestoreView}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textinput}
          placeholder="Name"
          onChangeText={text => setCityName(text)}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Address"
          onChangeText={text => setStateName(text)}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={styles.buttonview}>
        <TouchableOpacity style={styles.setButton} onPress={setData}>
          <Text style={styles.buttontext}>SetData</Text>
        </TouchableOpacity>
        <View style={styles.listview}>
          <FlatList
            data={userDetails}
            renderItem={itemData => renderView(itemData)}
          />
        </View>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  firestoreView: {
    padding: 20,
    flex: 1,
    backgroundColor: '#dcdcdc',
  },
  inputView: {
    padding: 10,
    marginHorizontal: 10,
  },
  buttonview: {
    padding: 10,
    marginHorizontal: 10,
  },
  textinput: {
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 10,
    paddingLeft: 20,
    borderRadius: 30,
  },
  setButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 30,
    marginVertical: 10,
  },
  getButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 30,
    marginVertical: 10,
  },
  buttontext: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  scrollview: {
    backgroundColor: 'cyan',
  },
  renderview: {
    backgroundColor: 'white',
    marginVertical: 10,
    padding: 10,
    borderRadius: 30,
  },
  renderText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listview: {
    height: '65%',
    marginVertical: 30,
    width: '100%',
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 30,
    elevation:5
  },
  addresstext: {
    textAlign: 'center',
  },
});
