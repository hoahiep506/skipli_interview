import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { collection } from "firebase/firestore"; 
import 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCtmR5nG4js0U1AjcThnkBzrRISgQp0IFo",
  authDomain: "skiplyinterview.firebaseapp.com",
  projectId: "skiplyinterview",
  storageBucket: "skiplyinterview.appspot.com",
  messagingSenderId: "45472064366",
  appId: "1:45472064366:web:374df8517961232421577f",
  measurementId: "G-47P6L4LZJG",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const PhoneNumber = collection(db, "PhoneNumber");


