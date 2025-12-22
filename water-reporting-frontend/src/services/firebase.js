import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDB_0FtauEsObqPJ_1ZsETlB1DpR9Z7Pc8",
    authDomain: "waterreportingsystem.firebaseapp.com",
    projectId: "waterreportingsystem",
    storageBucket: "waterreportingsystem.firebasestorage.app",
    messagingSenderId: "432284984120",
    appId: "1:432284984120:web:ce0a49548784bc76b257cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and Export Services
export const auth = getAuth(app);
// Use Long Polling to avoid "Offline" issues in restrictive networks
export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});
export const storage = getStorage(app);

export default app;
