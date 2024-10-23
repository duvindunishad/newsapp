// app/userdashboard/[id]/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // for navigation
import PostItems from '../../postitems/page'; // Assuming you have PostItems to display user's posts

export default function UserDashboard({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [user, setUser] = useState<{ email: string; id: string; name: string; createdAt: string } | null>(null); // Extended user data
    const [error, setError] = useState('');

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
        <div className="container mt-4">
            <h1>User Dashboard</h1>
            <h2>Welcome, {user?.name || 'Guest'}!</h2>

            {user && (
                <>
                    {/* Display additional user details */}
                    <div className="user-details mt-3">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>

                    {/* Create New Post Button */}
                    <button className="btn btn-primary mt-3" onClick={handleCreatePost}>
                        Create New Post
                    </button>

                    {/* Display user's posts */}
                    <PostItems />
                </>
            )}
        </div>
    );
}
