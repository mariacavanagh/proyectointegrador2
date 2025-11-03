import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCjCi8YAaMW_gESfCeEzCmGU27e8lCVkns",
    authDomain: "proyecto2-c229a.firebaseapp.com",
    projectId: "proyecto2-c229a",
    storageBucket: "proyecto2-c229a.firebasestorage.app",
    messagingSenderId: "425189985505",
    appId: "1:425189985505:web:0e961ce7a10ecf9eb23ba0"
  };

app.initializeApp(firebaseConfig);

export const auth=firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
