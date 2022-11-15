import { initializeApp } from "firebase/app"
import {
    getAuth,
    // signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth"
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAPLvlNWBsECmZrtbNI2UQ08mct-p4YiQ0",
    authDomain: "soccerteam-973c4.firebaseapp.com",
    projectId: "soccerteam-973c4",
    storageBucket: "soccerteam-973c4.appspot.com",
    messagingSenderId: "576518184821",
    appId: "1:576518184821:web:cfbfec6c171a6b2751bd3c",
    measurementId: "G-9X6FVC0RGS"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)


const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
        console.error(err)
        alert(err.message)
    }
}

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
            isConfirmed: false
        })
    } catch (err) {
        console.error(err)
        alert(err.message)
    }
}

const logout = () => {
    signOut(auth)
    console.log(`logout ~ auth`, auth)
}

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email)
        alert("Password reset link sent!")
    } catch (err) {
        console.error(err)
        alert(err.message)
    }
}


export {
    auth,
    db,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
}
