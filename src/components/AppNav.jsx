import React from 'react'
import { NavLink } from 'react-router-dom'

export const AppNav = () => {
    return (
        <header className='app-nav'>
            <section className="container">
                <nav >
                    <NavLink to='/profile'>Profile</NavLink>
                    {/* <NavLink to='/'>Login</NavLink> */}
                    {/* <NavLink to='/register'>Register</NavLink> */}
                </nav>
            </section>
        </header>

    )
}
