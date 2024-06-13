// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {firebaseConfig} from "./credenciales.js"; 
// Your web app's Firebase configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);