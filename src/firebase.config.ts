import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBg1oQJYvDfA6v_UBuQs7H4gkvJwFZEEjM",
  authDomain: "house-marketplace-sublet-4c125.firebaseapp.com",
  projectId: "house-marketplace-sublet-4c125",

  storageBucket: "house-marketplace-sublet-4c125.firebasestorage.app",
  // storageBucket: "house-markplace-sublet-4c125.appspot.com",

  messagingSenderId: "546990098316",
  appId: "1:546990098316:web:902d4892f3d165586ff8a9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
