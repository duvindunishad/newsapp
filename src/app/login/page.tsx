// pages/login.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter for redirection

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const router = useRouter(); // Initialize the router

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/login', { // Update the endpoint as necessary
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

      await response.json(); // Get user data or token
      setSuccess('Login successful!'); // Optionally, you might want to store a token or user info here

      // Redirect to dashboard on successful login
      router.push('/dashboard'); // Redirect to the dashboard page

    } catch (error) {
      setError((error as Error).message);
    }
  };
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="col-lg-5 col-md-7 col-sm-10">
        <div className="card shadow-lg border-0 rounded-lg">
          <div className="card-body p-5">
            <h2 className="card-title text-center mb-4">Login to Your Account</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleLogin}>
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
              <div className="form-group mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control rounded-pill"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 rounded-pill py-2"
              >
                Login
              </button>
            </form>
            <p className="text-center text-muted mt-3">
              Dont have an account?{' '}
              <Link href="/register" className="text-primary fw-bold">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
