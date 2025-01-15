import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "findplayer-80b6e.firebaseapp.com",
  projectId: "findplayer-80b6e",
  storageBucket: "findplayer-80b6e.firebasestorage.app",
  messagingSenderId: "733485502986",
  appId: "1:733485502986:web:e83358379f4983ab5b45f3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore database
export const db = getFirestore(app);
