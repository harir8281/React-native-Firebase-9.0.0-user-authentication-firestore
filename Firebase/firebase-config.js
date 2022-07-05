// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDiiPyB03Nfkpsi-GeeYyfKpL6kjZ2VTSQ',
  authDomain: 'fir-fresh-c7ba3.firebaseapp.com',
  projectId: 'fir-fresh-c7ba3',
  storageBucket: 'fir-fresh-c7ba3.appspot.com',
  messagingSenderId: '1068987156542',
  appId: '1:1068987156542:web:6b7d6255e07428797d296f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db=getFirestore(app)