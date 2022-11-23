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
        <div className='login-page'>
            <div className="login-container">
                <div className="login-form">
                    <input type="text" className="login-textbox" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail Address"
                    />
                    <input type="password" className="login-textbox" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
                    />
                    <button className="login-btn" onClick={() => logInWithEmailAndPassword(email, password)}>
                        Login
                    </button>
                    <div className='register-section'>
                        Don't have an account? <Link className='register-btn' to="/register">Register</Link> now.
                    </div>
                </div>
            </div>
        </div>
    )
}
