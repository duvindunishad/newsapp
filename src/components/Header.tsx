'use client';

import React, { useState, useEffect } from 'react';
import './header.css';
import Nav from './Nav';
import Sci from './Sci';
import SearchForm from './SearchForm';

export default function Header() {
    const [open, setOpen] = useState<boolean>(false);
    const [on, setOn] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Track login status

    useEffect(() => {
        // Check login status and retrieve user ID from localStorage
        const token = localStorage.getItem('token');
        if (token) {
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            if (userData.id) {
                setIsLoggedIn(true);
            }
        }
    }, []);

    const handleFormOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpen(prev => !prev); // Toggle search form
    };

    const handleToggleMenu = () => {
        setOn(prev => !prev); // Toggle mobile navigation
        document.body.classList.toggle('mobile-nav-active'); // Toggle body class for mobile nav
    };

    const handleLogout = () => {
        console.log("Logout button clicked");
        // Clear user session and local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false); // Update login status
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
                    <i
                        className={`bi mobile-nav-toggle ${on ? 'bi-x' : 'bi-list'}`}
                        onClick={handleToggleMenu}
                    ></i>
                    <SearchForm active={open} formOpen={handleFormOpen} />

                    {/* Dynamic Button Rendering */}
                    {isLoggedIn ? (
                        <button className="mx-2 btn btn-outline-secondary login-button" onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                        <button className="mx-2 btn btn-outline-secondary login-button" onClick={() => window.location.href = '/login'}>
                            Login
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}