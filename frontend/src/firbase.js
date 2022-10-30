import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyB2LBEJ21x5dHqb73UFpuMZS3pOK5DLj0Y",
  authDomain: "airbnb-bb569.firebaseapp.com",
  projectId: "airbnb-bb569",
  storageBucket: "airbnb-bb569.appspot.com",
  messagingSenderId: "822129720764",
  appId: "1:822129720764:web:16011428251de8d578bfb9",
  measurementId: "G-G5HY9NYLRK"
};

const firebaseApp = firebase.inirualizeApp(firebaseConfig)
const db = firebaseApp.firebaseStore()
