// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDw9W7x1EQu9W57eUsZnMMzMB-WAViSdzg",
  authDomain: "ggshop-17fe2.firebaseapp.com",
  projectId: "ggshop-17fe2",
  storageBucket: "ggshop-17fe2.appspot.com",
  messagingSenderId: "680392082618",
  appId: "1:680392082618:web:cbece8d3703d7a7314ee83",
  measurementId: "G-GH36YB094V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
