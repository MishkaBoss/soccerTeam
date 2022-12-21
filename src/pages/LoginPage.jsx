import React, { useState, useEffect } from "react";
import { auth, logInWithEmailAndPassword } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [confirmed, setConfirmed] = useState(false)
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) {
            navigate("/dashboard");
        }
    }, [user, loading]);

    return (
        <div>
            <h1 className="font-bold text-3xl md:text-5xl text-center my-14 text-mainColor">Soccer Team App</h1>
            <div className="flex flex-col items-center shadow-xl rounded-lg w-3/4 sm:w-80 h-96 mx-auto relative">
           <div className="flex flex-col items-center">
           <input
                type="text"
                className="border-none rounded-lg bg-gray-50 mt-7"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail Address"
            />
            <input
                type="password"
                className="border-none rounded-lg bg-gray-50 mt-5 mb-9"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
           </div>
            <button
                className="button button-main mb-"
                onClick={() => logInWithEmailAndPassword(email, password)}
            >
                Login
            </button>
            <div className="text-sm w-full absolute bottom-3 px-3">
                <p>Don't have an account? <span><Link className="text-mainColor underline font-bold " to="/register">Register</Link></span> now.</p>
            </div>
        </div>
        </div>
    );
};
