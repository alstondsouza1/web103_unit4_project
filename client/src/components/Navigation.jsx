import React from 'react'
import { NavLink } from 'react-router-dom'
import '../css/Navigation.css'

const Navigation = () => {
    return (
        <header className='showroom-header'>
            <NavLink to='/' className='showroom-brand'>
                <span className='brand-icon'>🏎️</span>
                <span>
                    <strong>BOLT BUCKET</strong>
                    <small>BUILD YOUR DRIVE</small>
                </span>
            </NavLink>

            <nav className='showroom-nav' aria-label='Main navigation'>
                <NavLink
                    to='/'
                    end
                    className={({ isActive }) =>
                        `showroom-nav-link ${isActive ? 'active' : ''}`
                    }
                >
                    Customize
                </NavLink>

                <NavLink
                    to='/customcars'
                    className={({ isActive }) =>
                        `showroom-nav-link ${isActive ? 'active' : ''}`
                    }
                >
                    My Garage
                </NavLink>
            </nav>
        </header>
    )
}

export default Navigation
