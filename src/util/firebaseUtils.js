import firebase from 'firebase';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDXWumhUmn9YV6QlaF2NXM7HUEljJTFumU",
    authDomain: "burguer-queen-89646.firebaseapp.com",
    databaseURL: "https://burguer-queen-89646.firebaseio.com",
    projectId: "burguer-queen-89646",
    storageBucket: "burguer-queen-89646.appspot.com",
    messagingSenderId: "251912600981",
    appId: "1:251912600981:web:a689492a061e40e8b50a9c",
    measurementId: "G-5FPLE1E8TX",
    timestampsInSnapshots: true
  };

 firebase.initializeApp(firebaseConfig);

  const firestore = firebase.firestore();
 const settings = {/* your settings...*/ timestampsInSnapshots: true};
 firestore.settings(settings); 

export default firebase

