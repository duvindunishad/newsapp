// pages/dashboard.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for redirection
import PostItems from '../postitems/page'; // Import the PostItems component

export default function DashboardPage() {
    const router = useRouter(); // Initialize the router
    const [user, setUser] = useState<{ email: string } | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        // Check if user is authenticated
        const checkUserAuthentication = async () => {
            try {
                const response = await fetch('/api/postitems'); // Endpoint to check user status
                if (!response.ok) {
                    throw new Error('User not authenticated');
                }
                const userData = await response.json();
                setUser(userData); // Assuming userData contains user information like email
            } catch (error) {
                setError((error as Error).message);
                router.push('/login'); // Redirect to login if not authenticated
            } finally {
                setLoading(false);
            }
        };

        checkUserAuthentication();
    }, [router]);

    // Loading state
    if (loading) {
        return (
            <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
                <h2>Loading...</h2>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
                <h2 className="text-danger">{error}</h2>
            </div>
        );
    }

    // Logout function
    const handleLogout = async () => {
        try {
            await fetch('/api/logout', {
                method: 'POST',
            });
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setUser(null);
            router.push('/login'); // Redirect to login after logout
        }
    };

    // Main dashboard content
    return (
        <div className="container">
            <h1 className="mt-4">Dashboard</h1>
            <h2>Welcome, {user?.email}!</h2>
            <p>This is your dashboard where you can manage your account.</p>
            <button className="btn btn-danger mt-4" onClick={handleLogout}>
                Logout
            </button>
            <PostItems /> {/* Display post items */}
        </div>
    );
}
