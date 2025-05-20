import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBUdWNjWD90RW9PxpQAhZgo-tlQfWbGxdA",
  authDomain: "playground-app-792c2.firebaseapp.com",
  projectId: "playground-app-792c2",
  storageBucket: "playground-app-792c2.firebasestorage.app",
  messagingSenderId: "899534344073",
  appId: "1:899534344073:web:ad5ebfa764ce035ebb9b58"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);