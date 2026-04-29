import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDROaMZ_6x0KC7sllo0IhUKb1JjuWCObZc",
  authDomain: "spottr-6d8a9.firebaseapp.com",
  projectId: "spottr-6d8a9",
  storageBucket: "spottr-6d8a9.firebasestorage.app",
  messagingSenderId: "502907666954",
  appId: "1:502907666954:web:e9df3275df23ec812615f3",
  measurementId: "G-HLEK6BZYL6"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);