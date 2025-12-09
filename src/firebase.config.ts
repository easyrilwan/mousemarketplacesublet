// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCsiAZ7D49V-pHLia0hmerL4iWUSyswZs",
  authDomain: "house-marketplace-sublet.firebaseapp.com",
  projectId: "house-marketplace-sublet",

  storageBucket: "house-marketplace-sublet.appspot.com",
  // storageBucket: "house-marketplace-sublet.firebasestorage.app",
  messagingSenderId: "679839873460",
  appId: "1:679839873460:web:7e28e0a1c45c7de80cdae1",
  measurementId: "G-QQ8MBKX1HT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();

// const analytics = getAnalytics(app);
// let analytics: ReturnType<typeof getAnalytics> | undefined;

// if (typeof window !== "undefined") {
//   analytics = getAnalytics(app);
// }
