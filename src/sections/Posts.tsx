'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './posts.css';
import PostItemOne from '../components/PostItemOne';
import TrendingPost from '@/components/TrendingPost';
import Preloader from '@/components/Preloader';

// Define the PostProps interface
export interface PostProps {
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
};

export default function Posts() {
  const router = useRouter();
  const [items, setItems] = useState<any | []>([]);
  const [item, setItem] =useState(initialPost);

  // Fetch all posts from the database
  const getItemsData = async () => {
    try {
      const response = await fetch(`/api/postitems`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setItems(data);
      if (data.length > 0) {
        // Pick a random post ID after successfully fetching all posts
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomId = data[randomIndex]._id;
        getSinglePostData(randomId);
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
    } catch (error) {
      console.error('Error fetching single post:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getItemsData();
  }, []);

  return (
    <section id="posts" className="posts">
      <div className="container" data-aos="fade-up">
        <div className="row g-5">
          <div className='col-lg-4'>
            <PostItemOne large={true} item={item}/>
          </div>
          <div className='col-lg-8'>
            <div className='row g-5'>
            <div className='col-lg-4 border-start custom-border'>
            {items &&
          items.length > 0 ? items.filter(
            (item: {trending: boolean, top:boolean})=>!item.trending && !item.top)
            .slice(0,3)
          .map((item: PostProps) => (
           <PostItemOne key={item._id} large={false} item={item}/>
          )): (<Preloader/>)
          }
            </div>
            <div className='col-lg-4 border-start custom-border'>
            {items &&
          items.length > 0 ? items.filter(
            (item: {trending: boolean, top:boolean})=>!item.trending && !item.top)
            .slice(3,6)
          .map((item: PostProps) => (
           <PostItemOne key={item._id} large={false} item={item}/>
          )):(<Preloader/>)
          }
            </div>
            <div className='col-lg-4'>
              <div className="trending">
                <h3>Trending</h3>
                <ul className='trending-post'>
                  {
                    items && 
                    items.length> 0 ? items.filter(
                      (item: {trending: boolean})=>item.trending)
                      .map((item: PostProps,index:number)=>(
                        <TrendingPost key={item._id} index={index} item={item}/>
                      )) : (<Preloader/>)
                    
                  }
                </ul>
              </div>
            </div>
            </div>
          </div>
        </div>
       
      </div>
    </section>
  );
};