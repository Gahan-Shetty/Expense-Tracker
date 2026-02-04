import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBRy1VHZ8u2oVqR-_y6lK4FEAStXRS70w",
  authDomain: "expense-tracker-a1687.firebaseapp.com",
  projectId: "expense-tracker-a1687",
  storageBucket: "expense-tracker-a1687.firebasestorage.app",
  messagingSenderId: "267848629884",
  appId: "1:267848629884:web:1949ea3118a187d51153f9",
};

const app = initializeApp(firebaseConfig);

// 👇 export these
export const auth = getAuth(app);
export const db = getFirestore(app);
