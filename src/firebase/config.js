import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAwy-7X3lxl2aDP0FdTF7VgH7YvPKv6zU4",
    authDomain: "fir-4f1e4.firebaseapp.com",
    projectId: "fir-4f1e4",
    storageBucket: "fir-4f1e4.appspot.com",
    messagingSenderId: "957324014260",
    appId: "1:957324014260:web:e57fb08e9564a384c31de1",
    measurementId: "G-M1TBQB9814"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { app, auth, storage, firestore };