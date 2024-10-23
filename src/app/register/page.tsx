// pages/register.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/register', { // Corrected API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if the response is not okay
      if (!response.ok) {
        const errorData = await response.json(); // Try to parse JSON error response
        throw new Error(errorData.message || 'Something went wrong'); // Adjusted error message handling
      }

      await response.json();
      setSuccess('User registered successfully! You can now log in.');
      // Optionally, you can redirect or clear the form here
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setError((error as Error).message);
    }
  };
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="col-lg-5 col-md-7 col-sm-10">
        <div className="card shadow-lg border-0 rounded-lg">
          <div className="card-body p-5">
            <h2 className="card-title text-center mb-4">Create an Account</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleRegister}>
              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control rounded-pill"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control rounded-pill"
                  id="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control rounded-pill"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 rounded-pill py-2"
              >
                Register
              </button>
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
