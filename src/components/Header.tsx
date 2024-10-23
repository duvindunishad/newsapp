'use client';

import React, { useState, useEffect } from 'react';
import './header.css';
import Nav from './Nav';
import Sci from './Sci';
import SearchForm from './SearchForm';

export default function Header() {
    const [open, setOpen] = useState(false);
    const [on, setOn] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
    const [, setUserId] = useState<string | null>(null); // Track user ID

    useEffect(() => {
        // Check login status and retrieve user ID from localStorage or context
        const token = localStorage.getItem('token'); // Example token storage
        if (token) {
            // Simulate fetching user data (replace with actual fetch call)
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            setIsLoggedIn(true);
            setUserId(userData.id); // Assume userData contains an id field
        }
    }, []);

    const handleFormOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpen(!open);
    };

    const handleToggleMenu = () => {
        setOn(!on);
        const body = document.querySelector('body');
        if (body) {
            body.classList.toggle('mobile-nav-active');
        }
    };

    const handleLogin = () => {
        console.log("Login button clicked");
        // Simulate successful login
        const simulatedUserId = '12345'; 
        // This would be dynamically set from your login logic
        localStorage.setItem('user', JSON.stringify({ id: simulatedUserId })); 
        // Save user ID in localStorage
        setIsLoggedIn(true); // Update login status
        setUserId(simulatedUserId); // Set the user ID
        // Redirect to the user's dashboard
        window.location.href = `/userdashboard/${simulatedUserId}`;
    };

    const handleLogout = () => {
        console.log("Logout button clicked");
        // Clear user session and local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false); // Update login status
        setUserId(null); // Clear user ID
        // Redirect to the home page
        window.location.href = '/';
    };

    return (
        <header id='header' className='header d-flex align-items-center fixed-top'>
            <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
                <a href="/" className="logo d-flex align-items-center">
                    <h1>News Paper</h1>
                </a>
                <Nav />
                <div className="position-relative d-flex align-items-center">
                    <Sci />
                    <button className='mx-2 js-search-open border-0' onClick={handleFormOpen}>
                        <span className='bi-search'></span>
                    </button>
                    {on ? (
                        <i className='bi bi-x mobile-nav-toggle' onClick={handleToggleMenu}></i>
                    ) : (
                        <i className='bi bi-list mobile-nav-toggle' onClick={handleToggleMenu}></i>
                    )}
                    <SearchForm active={open} formOpen={handleFormOpen} />

                    {/* Dynamic Button Rendering */}
                    {isLoggedIn ? (
                        <button className="mx-2 btn btn-outline-secondary login-button" onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                        <button className="mx-2 btn btn-outline-secondary login-button" onClick={handleLogin}>
                            Login
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
