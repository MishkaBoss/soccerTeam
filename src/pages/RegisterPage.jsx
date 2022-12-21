import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword, signInWithGoogle } from "../services/firebase";

export const RegisterPage = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()

    const register = () => {
        if (!name) alert('Please enter name')
        registerWithEmailAndPassword(name, email, password)
    }

    useEffect(() => {
        if (loading) return
        if (user) navigate('/')
    }, [user, loading])


    return (
        <div>
             <h1 className="font-bold text-3xl md:text-5xl text-center my-14 text-mainColor">Soccer Team App</h1>
          <div className="flex flex-col items-center shadow-xl rounded-lg w-3/4 sm:w-80 h-96 mx-auto relative">
          <div className="flex flex-col items-center">
                <input
                    type="text"
                    className="border-none rounded-lg bg-gray-50 mt-7"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                />
                <input
                    type="text"
                    className="border-none rounded-lg bg-gray-50 mt-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input
                    type="password"
                    className="border-none rounded-lg bg-gray-50 mt-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button className="button button-main absolute bottom-12" onClick={register}>
                    Register
                </button>
            </div>
          </div>
        </div>
    )
}
