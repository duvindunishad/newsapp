'use client';

import React, {useState} from 'react';
import './header.css';
import Nav from './Nav';
import Sci from './Sci';
import SearchForm from './SearchForm';

export default function Header() {
    const [open, setOpen] = useState(false);
    const [on, setOn] = useState(false);

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
        // Here you can handle the login logic, e.g., opening a login modal or redirecting to the login page
        console.log("Login button clicked");
        window.location.href = '/login';  // example of redirecting to the login page
    };

    return (
        <header id='header' className='header d-flex align-items-center fixed-top'>
            <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
                <a href="/" className="logo d-flex align-items-center">
                    {/* <img src="" alt="" /> */}
                    <h1>News Paper</h1>
                </a>
                <Nav />
                <div className="position-relative d-flex align-items-center">
                    <Sci />
                    <button className='mx-2 js-search-open border-0' onClick={handleFormOpen}>
                        <span className='bi-search'></span>
                    </button>
                    {
                        on ? (
                            <i className='bi bi-x mobile-nav-toggle' onClick={handleToggleMenu}></i>
                        ) : (
                            <i className='bi bi-list mobile-nav-toggle' onClick={handleToggleMenu}></i>
                        )
                    }
                    <SearchForm active={open} formOpen={handleFormOpen} />

                    {/* Added Login Button */}
                    <button className="mx-2 btn btn-outline-secondary login-button" onClick={handleLogin}>
                      Login
                    </button>
                </div>
            </div>
        </header>
    );
}
