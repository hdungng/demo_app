// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCwvjOr_fSX5rPmA_bLH8TUe_lLq4yuYqQ",
    authDomain: "exercise-2-e02e9.firebaseapp.com",
    databaseURL: "https://exercise-2-e02e9-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "exercise-2-e02e9",
    storageBucket: "exercise-2-e02e9.appspot.com",
    messagingSenderId: "994793712440",
    appId: "1:994793712440:web:3cdeab1bffbfd6c4812fcd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export { db };
