'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './posts.css';
import PostItemOne from '../components/PostItemOne';
import TrendingPost from '@/components/TrendingPost';
import Preloader from '@/components/Preloader';

// Define the PostProps interface
export interface PostProps {
  top: unknown;
  trending: unknown;
  _id: string;           // Post ID
  img: string;           // URL or path to the image
  category: string;      // Category of the post
  date: string;          // Date in string format
  title: string;         // Title of the post
  brief: string;         // Brief description or summary
  avatar: string;        // URL or path to the author's avatar
  author: string;        // Author's name
  description: string;   // Detailed description of the post
  figcaption: string;    // Caption for the image or figure
  paragraphs: string[];  // Array of paragraphs
}

// Initial Post object with default values
const initialPost: PostProps = {
  _id: '',
  img: '',
  category: '',
  date: '',
  title: '',
  brief: '',
  avatar: '',
  author: '',
  description: '',
  figcaption: '',
  paragraphs: [],
  top: undefined,
  trending: undefined
};

export default function Posts() {
  const router = useRouter();
  const [items, setItems] = useState<PostProps[]>([]); // Corrected state type
  const [item, setItem] = useState<PostProps>(initialPost); // State for the main post
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch all posts from the database
  const getItemsData = async () => {
    try {
      const response = await fetch(`/api/postitems`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setItems(data);
      if (data.length > 0) {
        // Fetch the single post with a specific ID or a random one
        getSinglePostData('671771646e3c79f1510ec947'); // Specific ID used as example
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Fetch a single post by ID
  const getSinglePostData = async (id: string) => {
    try {
      const response = await fetch(`/api/postitems/${id}`);
      if (response.status === 404) {
        router.push('/not-found');
      } else if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setItem(data);
      setLoading(false); // Stop loading after fetching data
    } catch (error) {
      console.error('Error fetching single post:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getItemsData();
  }, []); // Added empty dependency array to run only once on mount

  return (
    <section id="posts" className="posts">
      <div className="container" data-aos="fade-up">
        <div className="row g-5">
          <div className='col-lg-4'>
            {loading ? (
              <Preloader />
            ) : (
              <PostItemOne large={true} item={item} />
            )}
          </div>

          <div className='col-lg-8'>
            <div className='row g-5'>
              <div className='col-lg-4 border-start custom-border'>
                {items.length > 0 ? (
                  items.filter((item: PostProps) => !item.trending && !item.top)
                    .slice(0, 3)
                    .map((item: PostProps) => (
                      <PostItemOne key={item._id} large={false} item={item} />
                    ))
                ) : (
                  <Preloader />
                )}
              </div>

              <div className='col-lg-4 border-start custom-border'>
                {items.length > 0 ? (
                  items.filter((item: PostProps) => !item.trending && !item.top)
                    .slice(3, 6)
                    .map((item: PostProps) => (
                      <PostItemOne key={item._id} large={false} item={item} />
                    ))
                ) : (
                  <Preloader />
                )}
              </div>

              <div className='col-lg-4'>
                <div className="trending">
                  <h3>Trending</h3>
                  <ul className='trending-post'>
                    {items.length > 0 ? (
                      items.filter((item: PostProps) => item.trending)
                        .map((item: PostProps, index: number) => (
                          <TrendingPost key={item._id} index={index} item={item} />
                        ))
                    ) : (
                      <Preloader />
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
