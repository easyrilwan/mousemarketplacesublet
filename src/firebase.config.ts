// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBg1oQJYvDfA6v_UBuQs7H4gkvJwFZEEjM",
  authDomain: "house-marketplace-sublet-4c125.firebaseapp.com",
  projectId: "house-marketplace-sublet-4c125",

  storageBucket: "house-markplace-sublet-4c125.appspot.com",
  // storageBucket: "house-marketplace-sublet-4c125.firebasestorage.app",

  messagingSenderId: "546990098316",
  appId: "1:546990098316:web:902d4892f3d165586ff8a9",

  /* For Analytics */
  // measurementId: "G-4NT7044TKK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// const analytics = getAnalytics(app);
// let analytics: ReturnType<typeof getAnalytics> | undefined;

// if (typeof window !== "undefined") {
//   analytics = getAnalytics(app);
// }
