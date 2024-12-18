'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
// import PostItems from '../../userdashboard/postitems/page'; 
import PostItems from '../../postitems/page';
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
    username: string; 
}

export default function UserDashboard({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string>('');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [posts, setPosts] = useState<any[]>([]); // Changed to any[] for compatibility

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
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
                setUser(userData);
                // Fetch user posts here
                await fetchUserPosts(userData.id);
            } catch (error) {
                setError((error as Error).message);
                router.push('/login'); 
            }
        };
        fetchUserData();
    }, [params.id, router]);

    const fetchUserPosts = async (userId: string) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`/api/posts?userId=${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const postData = await response.json();
            setPosts(postData);
        } catch (error) {
            console.error((error as Error).message);
        }
    };

    const handleDeletePost = async (postId: string) => {
        const token = localStorage.getItem('token');
        if (confirm('Are you sure you want to delete this post?')) {
            try {
                const response = await fetch(`userdashboard/updatetepostitem/${postId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    // Refresh the posts list after deletion

                    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
                } else {
                    throw new Error('Failed to delete post');
                }
            } catch (error) {
                console.error((error as Error).message);
            }
        }
    };

    const handleCreatePost = () => {
        router.push('/userdashboard/createpostitem');
    };

    const handleEditPost = (postId: string) => {
        router.push(`userdashboard/updatetepostitem/${postId}`);
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
                    <div className="card shadow-sm border-0 mb-5">
                        <div className="card-body">
                            <h3 className="card-title text-secondary">User Information</h3>
                            <hr />
                            <p><strong>Username:</strong> {user.firstName}</p>
                            <p><strong>Full Name:</strong> {user.firstName} {user.lastName}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Mobile:</strong> {user.mobileNumber}</p>
                            <p><strong>Address:</strong> {user.address.street}, {user.address.city}, {user.address.state} {user.address.zipCode}</p>
                        </div>
                    </div>

                    <div className="text-center mb-5">
                        <button className="btn btn-lg btn-primary" onClick={handleCreatePost}>
                            Create New Post
                        </button>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <PostItems posts={posts} onEditPost={handleEditPost} onDeletePost={handleDeletePost} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}