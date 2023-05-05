import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDG-fOgzLEW3DpPnaK591MpbjnPWHrUepM",
    authDomain: "tea-22-23-j-17.firebaseapp.com",
    projectId: "tea-22-23-j-17",
    storageBucket: "tea-22-23-j-17.appspot.com",
    messagingSenderId: "959733090536",
    appId: "1:959733090536:web:47b2c6c9ab6876ef6be15d",
    measurementId: "G-WYY3CE5W67"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
