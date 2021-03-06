// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOt9OWZadd5t1J6bG9w2vqmONQ5kSz3S0",
  authDomain: "yesmk-6aaac.firebaseapp.com",
  databaseURL:
    "https://yesmk-6aaac-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "yesmk-6aaac",
  storageBucket: "yesmk-6aaac.appspot.com",
  messagingSenderId: "368165284861",
  appId: "1:368165284861:web:77d237d2cd8d4fa5c0c794",
  measurementId: "G-FHPH3KSYYX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
