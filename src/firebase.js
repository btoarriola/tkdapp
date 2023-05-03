import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApdYjs-MRjMRTsZ_otWveSI23UVmNNSpI",
  authDomain: "tkdapp-33cb6.firebaseapp.com",
  projectId: "tkdapp-33cb6",
  storageBucket: "tkdapp-33cb6.appspot.com",
  messagingSenderId: "788796213548",
  appId: "1:788796213548:web:42d65c13f908c922b90489"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();
const storage = firebase.storage();
export { 
  storage, firestore as default
}