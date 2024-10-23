'use client';

import PageTitle from '@/components/PageTitle';
import PostItemOne from '@/components/PostItemOne';
import Preloader from '@/components/Preloader';
import { PostProps } from '@/sections/Posts';
import React, { useState, useEffect } from 'react';

export default function PostItems() {
    const [items, setItems] = useState<PostProps[]>([]); // Use PostProps type for better type safety
    const [loading, setLoading] = useState<boolean>(true); // Add a loading state

    const getItemsData = async () => {
        setLoading(true); // Set loading to true before fetching
        try {
            const response = await fetch(`/api/postitems`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setItems(data);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error('An unknown error occurred');
            }
        } finally {
            setLoading(false); // Stop loading after fetching data
        }
    };
    useEffect(() => {
        getItemsData(); // Fetch data when the component mounts
    }, []); // Empty dependency array ensures this runs only once

    return (
        <main id='main'>
            <section id='posts' className='posts'>
                <div className="container">
                    <div className="row">
                        <PageTitle title='Post item list' />
                        {loading ? ( // Show preloader while loading
                            <Preloader />
                        ) : (
                            items.length > 0 ? (
                                items.map((item: PostProps) => (
                                    <div className="col-lg-3 col-md-6" key={item._id}>
                                        <PostItemOne large={false} item={item} />
                                    </div>
                                ))
                            ) : (
                                <p>No posts available.</p> // Handle case where there are no posts
                            )
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
