import { initializeApp } from "firebase/app";
import {getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword,signInWithPopup,signOut, GoogleAuthProvider, onAuthStateChanged} from "firebase/auth"
import{
  collection,
  getFirestore,
  getDocs,
  addDoc,
  setDoc,
  doc,
} from 'firebase/firestore'

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
})


//auth
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

//db
const db = getFirestore(app)
const colRef = collection(db,'users')

export{
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  provider,
  onAuthStateChanged,
  signOut,
  colRef,
  getDocs,
  addDoc,
  setDoc,
  doc,
  db
}

export default app;
