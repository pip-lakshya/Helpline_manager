import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbWVAF89ecsRglCeJXjuiFwpt2gjoVgLE",
  authDomain: "helpline-manager.firebaseapp.com",
  projectId: "helpline-manager",
  storageBucket: "helpline-manager.firebasestorage.app",
  messagingSenderId: "412306351933",
  appId: "1:412306351933:web:9d83e7f0fd3dfdc2bec754"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);