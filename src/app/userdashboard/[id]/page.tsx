// app/userdashboard/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // for navigation
import PostItems from '../../postitems/page'; // Component to display user's posts

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
    createdAt: string;
    username: string; // Assuming 'username' is a field in the user data
}

export default function UserDashboard({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                router.push('/login'); // Redirect to login if no token found
                return;
            }

            try {
                const response = await fetch(`/api/user/${params.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const userData = await response.json();
                setUser(userData); // Store user data
            } catch (error) {
                setError((error as Error).message);
                router.push('/login'); // Redirect if error fetching user data
            }
        };

        fetchUserData();
    }, [params.id, router]);

    const handleCreatePost = () => {
        router.push('/createpost'); // Redirect to create new post page
    };

    if (error) {
        return (
            <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
                <h2 className="text-danger">{error}</h2>
            </div>
        );
    }

    return (
        <div className="container mt-6">
            <div className="text-center mb-5 mt-5 pt-5">
                <h1 className="display-4 font-weight-bold text-primary">User Dashboard</h1>
                <h2 className="text-muted">Welcome, {user?.firstName || 'Guest'}!</h2>
            </div>

            {user && (
                <>
                    {/* Display user details */}
                    <div className="card shadow-sm border-0 mb-5">
                        <div className="card-body">
                            <h3 className="card-title text-secondary">User Information</h3>
                            <hr />
                            <p className="card-text"><strong>Username:</strong> {user.firstName}</p>
                            <p className="card-text"><strong>Full:</strong> {user.firstName} {user.lastName}</p>
                            <p className="card-text"><strong>Email:</strong> {user.email}</p>
                            <p className="card-text"><strong>Mobile Number:</strong> {user.mobileNumber}</p>
                            <p className="card-text"><strong>Address:</strong> {user.address.street}, {user.address.city}, {user.address.state} {user.address.zipCode}</p>
                            {/* <p className="card-text"><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p> */}
                        </div>
                    </div>

                    {/* Create New Post Button */}
                    <div className="text-center mb-5">
                        <button 
                            className="btn btn-lg btn-primary"
                            onClick={handleCreatePost}
                        >
                            Create New Post
                        </button>
                    </div>

                    {/* Display user's posts */}
                    <div className="row">
                        <div className="col-md-12">
                            <PostItems />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
