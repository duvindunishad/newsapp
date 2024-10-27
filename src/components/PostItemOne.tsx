import React from 'react';
import './postitemone.css';
import Link from 'next/link';
import { PostProps } from '@/sections/Posts';
import Image from 'next/image';

// Import the default avatar image
import defaultAvatar from '../../public/assets/img/profileicon.png'; // Adjust the path based on your folder structure

interface PostItemOneProps {
  large: boolean;
  item: PostProps;
}

const PostItemOne: React.FC<PostItemOneProps> = ({ large, item }) => {
  // Function to format image paths safely
  const formatImagePath = (path: string | null): string => {
    return path ? (path.startsWith('/') ? path : `/${path}`) : ''; // Return formatted path or empty string
  };

  return (
    <div className={`post-entry-1 ${large ? 'lg' : ''}`}>
      <Link href={`postitems/${item._id}`}>
        <Image
          src={formatImagePath(item.img)} // Format the image path
          alt={item.title || 'Post image'} // Provide a meaningful alt text
          className='img-fluid'
          width={600}
          height={100}
        />
      </Link>
      <div className="post-meta">
        <span className='date'>{item.category}</span>
        <span className='mx-1'>
          <i className='bi bi-col'></i>
        </span>
        <span>{new Date(item.date).toLocaleDateString('en-US')}</span>
      </div>
      <h2>
        <Link href={`postitems/${item._id}`}>{item.title}</Link>
      </h2>
      {large && (
        <>
          <p className='mb-4 d-block'>{item.brief}</p>
          <div className='d-flex align-items-center author'>
            <div className='photo'>
              <Image 
                src={formatImagePath(item.avatar) || defaultAvatar} // Use default avatar if item.avatar is falsy
                alt={`${item.author}'s avatar`} // Provide a meaningful alt text
                className='img-fluid' 
                width={100} 
                height={100} 
              />
            </div>
            <div className='name'>
              <h3 className='m-0 p-0'>{item.author}</h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PostItemOne;
