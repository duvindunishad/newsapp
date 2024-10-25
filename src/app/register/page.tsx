'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validate passwords
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate mobile number format
    const mobileRegex = /^\+?[1-9]\d{1,14}$/; 
    if (!mobileRegex.test(mobileNumber)) {
      setError('Invalid mobile number format');
      setLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; 
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      setLoading(false);
      return;
    }

    // Prepare the registration data
    const registrationData = {
      firstName,
      lastName,
      email,
      password,
      mobileNumber,
      address,
    };

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      setSuccess('User registered successfully! You can now log in.');
      resetForm(); 
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(prevAddress => ({ ...prevAddress, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setMobileNumber('');
    setAddress({ street: '', city: '', state: '', zipCode: '' });
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light mt-5 py-5 mb-5">
      <div className="col-lg-10 col-md-12 col-sm-12">
        <div className="card shadow-lg border-0 rounded-lg">
          <div className="card-body p-5">
            <h2 className="card-title text-center mb-4">Create an Account</h2>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            {success && <div className="alert alert-success" role="alert">{success}</div>}
            <form onSubmit={handleRegister} className="row g-4">

              {/* First Name */}
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="firstName"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    aria-required="true"
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="lastName"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    aria-required="true"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control rounded-pill"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-required="true"
                    aria-describedby="emailHelp"
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We will never share your email with anyone else.
                  </small>
                </div>
              </div>

              {/* Password */}
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control rounded-pill"
                    id="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    aria-required="true"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control rounded-pill"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    aria-required="true"
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="mobileNumber"
                    placeholder="Enter your mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                    aria-required="true"
                  />
                </div>
              </div>

              {/* Address Fields */}
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Street Address</label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    name="street"
                    placeholder="Enter your street"
                    value={address.street}
                    onChange={handleAddressChange}
                    required
                    aria-required="true"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    name="city"
                    placeholder="Enter your city"
                    value={address.city}
                    onChange={handleAddressChange}
                    required
                    aria-required="true"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    name="state"
                    placeholder="Enter your state"
                    value={address.state}
                    onChange={handleAddressChange}
                    required
                    aria-required="true"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Zip Code</label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    name="zipCode"
                    placeholder="Enter your zip code"
                    value={address.zipCode}
                    onChange={handleAddressChange}
                    required
                    aria-required="true"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="col-12">
                <button type="submit" className="btn btn-primary w-100 rounded-pill py-2" disabled={loading}>
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </div>
            </form>
            <p className="text-center text-muted mt-3">
              Already have an account?{' '}
              <Link href="/login" className="text-primary fw-bold">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
