'use client';
import React from 'react';


const Contact = () => {
  return (
    <div className="contact-page bg-light text-dark py-5 mt-5">
      <div className="container">
        
        {/* Header Section */}
        <div className="row text-center mb-5">
          <div className="col">
            <h1 className="display-4 font-weight-bold text-primary">Contact Us</h1>
            <p className="lead text-secondary">We are here to help and answer any question you might have!</p>
          </div>
        </div>

        <div className="row">
          {/* Contact Form */}
          <div className="col-md-6 mb-5">
            <h2 className="font-weight-bold text-primary mb-4">Send Us a Message</h2>
            <form>
              <div className="form-group mb-3">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter your name" required />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="message">Message</label>
                <textarea className="form-control" id="message" rows={5} placeholder="Your message" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-block mt-3">Send Message</button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="col-md-6 mb-5">
            <h2 className="font-weight-bold text-primary mb-4">Contact Information</h2>
            <p className="text-secondary">Feel free to reach out to us at any time. We’re happy to connect and answer your questions.</p>
            <ul className="list-unstyled">
              <li className="mb-3">
                <i className="bi bi-telephone-fill text-primary"></i>
                <strong> Phone:</strong> +1 (123) 456-7890
              </li>
              <li className="mb-3">
                <i className="bi bi-envelope-fill text-primary"></i>
                <strong> Email:</strong> contact@yourblog.com
              </li>
              <li>
                <i className="bi bi-geo-alt-fill text-primary"></i>
                <strong> Address:</strong> 123 Main St, Suite 101, Cityville, Country
              </li>
            </ul>
          </div>
        </div>

        {/* Map Section */}
        <div className="row">
          <div className="col">
            <h2 className="text-center text-primary font-weight-bold mb-4">Our Location</h2>
            <div className="embed-responsive embed-responsive-16by9 shadow-sm rounded">
              <iframe
                className="embed-responsive-item"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093747!2d144.9537363158446!3d-37.81720984202116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf0727f28230d7a57!2sVictoria%20Harbour!5e0!3m2!1sen!2sau!4v1612215951991!5m2!1sen!2sau"
                width="100%"
                height="450"
                allowFullScreen={false}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Inline Styles */}
      <style jsx>{`
        .contact-page {
          background: #f8f9fa;
        }
      `}</style>
    </div>
  );
};

export default Contact;
