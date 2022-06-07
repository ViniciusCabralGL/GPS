import firebase from "firebase"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyA-kJZNXX6u26UbmiVUjxBNEpWVETOkHnk",
    authDomain: "gps-project-5e6e1.firebaseapp.com",
    projectId: "gps-project-5e6e1",
    storageBucket: "gps-project-5e6e1.appspot.com",
    messagingSenderId: "1087349120753",
    appId: "1:1087349120753:web:f3c2d3fcc84c34ac401350"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;
