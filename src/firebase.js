import * as firebase from "firebase/app";
import 'firebase/firestore' ; 
import 'firebase/storage' ; 
import 'firebase/auth' ; 
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL:  "https://charge-on-the-go-9e902-default-rtdb.firebaseio.com/",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db  = getDatabase(app); 
export default app  ; 
export {db} ; 