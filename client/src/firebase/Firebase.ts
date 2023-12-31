import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getAuth } from 'firebase/auth'
// Firebase v9 requires us to import as firebase/compat/..., though in other documentation
// you might just see something like import firebase/app

// Leave this file to itself. Here we have the configuration for Firebase to allow
// for it to access the database. Contact me if you would like to manually edit the
// database, but for now see App.tsx to see how data augmentation could work.

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_CONFIG_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_CONFIG_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_CONFIG_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_CONFIG_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_CONFIG_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_CONFIG_APPID
  };

const app = firebase.initializeApp(firebaseConfig)

// For other files that will use firebase, place a "import firebase from './Firebase'" up top;
export const auth = getAuth(app)
export default firebase