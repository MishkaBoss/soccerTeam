// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAPLvlNWBsECmZrtbNI2UQ08mct-p4YiQ0",
    authDomain: "soccerteam-973c4.firebaseapp.com",
    projectId: "soccerteam-973c4",
    storageBucket: "soccerteam-973c4.appspot.com",
    messagingSenderId: "576518184821",
    appId: "1:576518184821:web:cfbfec6c171a6b2751bd3c",
    measurementId: "G-9X6FVC0RGS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);