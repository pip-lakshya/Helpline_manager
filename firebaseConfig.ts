import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDA-ZVbEo1PFYQ0ybj8QEcByKQWALoXC54",
  authDomain: "helpline-manager.firebaseapp.com",
  projectId: "helpline-manager",
  storageBucket: "helpline-manager.firebasestorage.app",
  messagingSenderId: "412306351933",
  appId: "1:412306351933:web:9d83e7f0fd3dfdc2bec754",
  measurementId: "G-JS7V2ZBZNF"
};

const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);



