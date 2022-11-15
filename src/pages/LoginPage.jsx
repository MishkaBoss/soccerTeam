import React, { useState, useEffect } from 'react'
import { auth, logInWithEmailAndPassword } from '../services/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


export const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [confirmed, setConfirmed] = useState(false)
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (loading) {
            return
        }
        if (user) {
            navigate('/dashboard')
        }
    }, [user, loading])

    return (
        <div>LoginPage /login
            <div className="login__container">
                <input type="text" className="login__textBox" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail Address"
                />
                <input type="password" className="login__textBox" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
                />
                <button className="login__btn" onClick={() => logInWithEmailAndPassword(email, password)}>
                    Login
                </button>
                <div>
                    Don't have an account? <Link to="/register">Register</Link> now.
                </div>
            </div>
        </div>
    )
}
