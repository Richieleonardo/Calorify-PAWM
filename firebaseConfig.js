import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBzhdfltkBvXa64Y4p-WczOVTs6A1_aBAc",
    authDomain: "calorify-v3.firebaseapp.com",
    projectId: "calorify-v3",
    storageBucket: "calorify-v3.firebasestorage.app",
    messagingSenderId: "437839799724",
    appId: "1:437839799724:web:559e7b6e4d1678c4bd8609",
    measurementId: "G-SQGNDN1RT7"
};

const app = initializeApp(firebaseConfig);


export default app;
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
