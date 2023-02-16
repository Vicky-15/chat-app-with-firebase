// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCteVMJs4dAkXzoqdwAAyyxu7PtGDCBO-U",
  authDomain: "v-chat-bfdbc.firebaseapp.com",
  projectId: "v-chat-bfdbc",
  storageBucket: "v-chat-bfdbc.appspot.com",
  messagingSenderId: "186166464039",
  appId: "1:186166464039:web:32ecbf58ebdb679b8e8802",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// auth-db , contains app as property and auth-db details
export const auth = getAuth();
// storage bucket
export const storage = getStorage();
// firestorage
export const db = getFirestore();
