// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  "firebase/auth";
import "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvXjCDY8qKxd-H0NJf5JKj7AT3b5PBp6U",
  authDomain: "fir-crudlatihan.firebaseapp.com",
  projectId: "fir-crudlatihan",
  storageBucket: "fir-crudlatihan.appspot.com",
  messagingSenderId: "668532486176",
  appId: "1:668532486176:web:408a1ee6e83e580c594c45",
  measurementId: "G-MD0RY8TQRZ",
  databaseURL: "https://fir-crudlatihan-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app