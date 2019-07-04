import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const settings = {timestampsInSnapshots: true};

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyANkRVJ_a97_z_ULGKmhWysYxF_QdRaCVw",
    authDomain: "djamware-51bcd.firebaseapp.com",
    databaseURL: "https://djamware-51bcd.firebaseio.com",
    projectId: "djamware-51bcd",
    storageBucket: "djamware-51bcd.appspot.com",
    messagingSenderId: "686658768199",
    appId: "1:686658768199:web:70c859b7db511c31"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.firestore().settings(settings);

export default firebase;