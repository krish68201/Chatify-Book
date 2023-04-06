

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBteDA4_NzPcDpsNoeK5Qx9k6zmtLUGdwY",
  authDomain: "chatapplication-ed240.firebaseapp.com",
  projectId: "chatapplication-ed240",
  storageBucket: "chatapplication-ed240.appspot.com",
  messagingSenderId: "964039018754",
  appId: "1:964039018754:web:b11dd2fd17489c62b89a1b",
  measurementId: "G-GJ6ERELGWN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth =getAuth();
export const storage = getStorage();
export const db=getFirestore();

