import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
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

// Delete the following later. This is exclusively used in Scratch-Work.
const provider = new GoogleAuthProvider()
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider).then((result) => {
    const name = result.user.displayName as string
    const email = result.user.email as string
    const profPic = result.user.photoURL as string
    const uuid = result.user.uid

    localStorage.setItem('name', name)
    localStorage.setItem('email', email)
    localStorage.setItem('profPic', profPic)
    localStorage.setItem('uuid', uuid)

    window.location.reload();
  }).catch((e) => console.log(e))
}

export const signOutWithGoogle = () => {
  localStorage.removeItem('name')
  localStorage.removeItem('email')
  localStorage.removeItem('profPic')
  localStorage.removeItem('uuid')
  signOut(auth);
  window.location.reload();
}
// Delete the above later.


// For other files that will use firebase, place a "import firebase from './Firebase'" up top;
export const auth = getAuth(app)
export default firebase