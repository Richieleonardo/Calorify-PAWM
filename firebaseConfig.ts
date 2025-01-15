import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBzhdfltkBvXa64Y4p-WczOVTs6A1_aBAc",
  authDomain: "calorify-v3.firebaseapp.com",
  projectId: "calorify-v3",
  storageBucket: "calorify-v3.appspot.com",
  messagingSenderId: "437839799724",
  appId: "1:437839799724:web:559e7b6e4d1678c4bd8609",
  measurementId: "G-SQGNDN1RT7",
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Export the authentication instance
const autentikasi = getAuth(app);

export { app, autentikasi };
