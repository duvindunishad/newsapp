"use client";
// app/postitems/page.tsx
import React, { useState, useEffect } from 'react';
import PageTitle from '@/components/PageTitle';
import PostItemOne from '@/components/PostItemOne';
import Preloader from '@/components/Preloader';
import { PostProps } from '@/sections/Posts';

interface PostItemsProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    posts: any[];
    onEditPost: (postId: string) => void;
    onDeletePost: (postId: string) => Promise<void>;
    
}

export default function PostItems({  }: PostItemsProps) {
    const [items, setItems] = useState<PostProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getItemsData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/postitems`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error(error instanceof Error ? error.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getItemsData();
    }, []);

    return (
        <main id='main'>
            <section id='posts' className='posts'>
                <div className="container">
                    <div className="row">
                        <PageTitle title='Post item list' />
                        {loading ? (
                            <Preloader />
                        ) : items.length > 0 ? (
                            items.map((item) => (
                                <div className="col-lg-3 col-md-6" key={item._id}>
                                    <PostItemOne large={false} item={item} onEdit={function (): void {
                                        throw new Error('Function not implemented.');
                                    } } />
                                </div>
                            ))
                        ) : (
                            <p>No posts available.</p>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}