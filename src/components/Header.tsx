'use client';

import React, { useState, useEffect } from 'react';
import './header.css';
import Nav from './Nav';
import Sci from './Sci';
import SearchForm from './SearchForm';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

export default function Header() {
    const [open, setOpen] = useState(false);
    const [on, setOn] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
    const router = useRouter(); // Initialize router

    useEffect(() => {
        // Check login status on component mount
        const checkLoginStatus = async () => {
            // You can replace this with your actual API call to check login status
            const response = await fetch('api/auth/status'); // Adjust the endpoint
            if (response.ok) {
                const data = await response.json();
                setIsLoggedIn(data.isLoggedIn); // Assuming the response returns an isLoggedIn boolean
            }
        };
        checkLoginStatus();
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

    const handleLogout = async () => {
        try {
            await fetch('/api/logout', {
                method: 'POST',
            });
            setIsLoggedIn(false); // Update login status
            router.push('/login'); // Redirect to login after logout
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleLogin = () => {
        // Redirect to login page
        router.push('/login'); 
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
                        <>
                            <button className="mx-2 btn btn-outline-secondary" onClick={handleLogout}>
                                Logout
                            </button>
                            {/* New Post Button */}
                            <button className="mx-2 btn btn-primary" onClick={() => router.push('/newpost')}>
                                New Post
                            </button>
                        </>
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
