// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Correctly importing getAuth
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoU-_0IGt284ZAab93L_RSX7BhOuxMPNU",
  authDomain: "studentdashboard-a26a3.firebaseapp.com",
  projectId: "studentdashboard-a26a3",
  storageBucket: "studentdashboard-a26a3.firebasestorage.app",
  messagingSenderId: "580266003025",
  appId: "1:580266003025:web:9876f67a84c119624cc670"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Firestore
export default app;