import React from 'react'
import { useNavigate } from 'react-router-dom'


export const NotAnAdmin = () => {
    const navigate = useNavigate()

    const onBack = () => {
        navigate('/dashboard')
    }
    return (
        <div>
            <h1 className='text-red-500 text-3xl font-bold'>Access Denied</h1>
            <h1 className='text-red-500 text-3xl font-bold'>Not An Admin!</h1>
            <button className='button button-main' onClick={onBack}>Back</button>
        </div>
    )
}
