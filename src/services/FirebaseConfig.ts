// ============================================================
// FIREBASE CONFIG — Auth + Firestore only (free Spark plan)
// ============================================================
//
// 1. Go to https://console.firebase.google.com
// 2. Select your project > gear icon > Project Settings
// 3. Scroll to "Your apps" > Web app
// 4. Copy the config values below
// ============================================================

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKivj41GuP6Oni1iJK7AW6egeDWhCYen0",
  authDomain: "tripplannerapp-2f7cc.firebaseapp.com",
  projectId: "tripplannerapp-2f7cc",
  storageBucket: "tripplannerapp-2f7cc.firebasestorage.app",
  messagingSenderId: "632910224741",
  appId: "1:632910224741:web:d76e60e3cb3761601dd58c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
