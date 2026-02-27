import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "Your api key here",
  authDomain: "Your auth domain here",
  projectId: "Your project id here",
  storageBucket: "Your storage bucket here",
  messagingSenderId: "Your sender id here",
  appId: "Your app id here",
  measurementId: "Your measurement id here",
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
