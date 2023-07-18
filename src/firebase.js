import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAYGQBr NLq9NOlCTtEAcVAhBnUxrkMjxcU",
    authDomain: "jobify-xyz.firebaseapp.com",
    projectId: "jobify-xyz",
    storageBucket: "jobify-xyz.appspot.com",
    messagingSenderId: "816520716659",
    appId: "1:816520716659:web:3db131d747e27f9312a506"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  

export const auth = firebase.auth();
export const db= firebase.database();
export const storage = firebase.storage();

auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .catch((error) => {
    console.error('Error setting Firebase Auth persistence:', error);
  });
  
export default firebase;
