//import relevant libraries
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

//app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDxWSOo_Iq6NHfSIYyor-PJqrxlRxbk3Dk",
    authDomain: "j-17-81a9b.firebaseapp.com",
    projectId: "j-17-81a9b",
    storageBucket: "j-17-81a9b.appspot.com",
    messagingSenderId: "582110504780",
    appId: "1:582110504780:web:db1fa18ca31fb5198fd1e9",
    measurementId: "G-4EP1GV0S6L"
  };
  
//if the firebase app not initialized yet, if so initialize the app 
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();
const storage = firebase.storage();

export { firebase, firestore, storage };