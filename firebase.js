// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC6xceyGaCb4YpWrOsbcebL0Hhd0BLNbRE',
  authDomain: 'rhine9-c06ba.firebaseapp.com',
  projectId: 'rhine9-c06ba',
  storageBucket: 'rhine9-c06ba.appspot.com',
  messagingSenderId: '417576747685',
  appId: '1:417576747685:web:20e6b81aa10ba4a387c34c',
  measurementId: 'G-3CVS0E9XKS',
};

// Initialize Firebase
const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

const db = getFirestore();
const storage = getStorage();
export { app, db, storage };
