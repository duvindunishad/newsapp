'use client';
import React from 'react';
import './footer.css'
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light pt-5">
      <div className="container">
        <div className="row mb-5">
          
          {/* About Section */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="text-uppercase font-weight-bold text-white mb-3">About Us</h5>
            <p className="text-muted">
              We provide insightful content crafted to educate, inspire, and entertain. Our blog is your daily dose of inspiration and knowledge.
            </p>
            <p className="text-muted">
              Our dedicated team works tirelessly to bring you fresh and reliable information.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="text-uppercase font-weight-bold text-white mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link href="/" className="footer-link">Home</Link></li>
              <li><Link href="/about" className="footer-link">About Us</Link></li>
              <li><Link href="/blog" className="footer-link">Blog</Link></li>
              <li><Link href="/contact" className="footer-link">Contact</Link></li>
              <li><Link href="/privacy" className="footer-link">Privacy Policy</Link></li>
              <li><Link href="/terms" className="footer-link">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Popular Categories Section */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="text-uppercase font-weight-bold text-white mb-3">Popular Categories</h5>
            <ul className="list-unstyled">
              <li><Link href="/category/technology" className="footer-link">Technology</Link></li>
              <li><Link href="/category/lifestyle" className="footer-link">Lifestyle</Link></li>
              <li><Link href="/category/travel" className="footer-link">Travel</Link></li>
              <li><Link href="/category/food" className="footer-link">Food & Recipes</Link></li>
              <li><Link href="/category/health" className="footer-link">Health & Wellness</Link></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="text-uppercase font-weight-bold text-white mb-3">Stay Updated</h5>
            <p className="text-muted">
              Subscribe to our newsletter for the latest updates and articles directly to your inbox.
            </p>
            <form className="d-flex">
              <input
                type="email"
                className="form-control me-2 rounded"
                placeholder="Enter your email"
                aria-label="Email"
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>

          {/* Social Media Links */}
          <div className="col-lg-2 col-md-6 mb-4 text-center text-lg-left">
            <h5 className="text-uppercase font-weight-bold text-white mb-3">Follow Us</h5>
            <div>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link me-3">
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link me-3">
                <i className="bi bi-twitter fs-4"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link me-3">
                <i className="bi bi-instagram fs-4"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="bi bi-linkedin fs-4"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="row">
          <div className="col">
            <hr className="border-top border-light" />
          </div>
        </div>

        {/* Copyright */}
        <div className="row">
          <div className="col text-center">
            <p className="text-muted small mb-0">
              &copy; {new Date().getFullYear()} Your Blog. All rights reserved.
            </p>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
