import firebase, { initializeApp } from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCwH5T6kXj1w-r9pPxNTcPq9Xhe-09imDQ",
  authDomain: "test-71d39.firebaseapp.com",
  projectId: "test-71d39",
  storageBucket: "test-71d39.appspot.com",
  messagingSenderId: "625274328806",
  appId: "1:625274328806:web:3e646b40f5e6378318cd27",
  measurementId: "G-YZBY3M5M4Z",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

export { firebase, auth, firestore, analytics };
