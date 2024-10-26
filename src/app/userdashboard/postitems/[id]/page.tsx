'use client';
import { useEffect, useState } from "react";
import React from 'react';
import './style.css';
import Image from "next/image";
import Preloader from "@/components/Preloader";
import SidePostItem from "@/components/SidePostItem";

// Import icons from Font Awesome (you may need to install font-awesome package)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export interface PostProps {
  top: unknown;
  trending: unknown;
  _id: string;           // Post ID, should be a string
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

// Define initialPost object with default values
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

export default function PostItem({ params }: { params: { id: string } }) {
  const id: string = params.id;

  const [item, setItem] = useState(initialPost);
  const [items, setItems] = useState([]);

  const tabsData = [
    { id: 1, name: 'Popular', active: true },
    { id: 2, name: 'Trending', active: false },
  ];

  const [tabs, setTabs] = useState(tabsData);

  const handleTabActive = (id: number): void => {
    setTabs(tabsData.map(tab => {
      tab.active = false;
      if (tab.id === id) tab.active = true;
      return tab;
    }));
  };

  const getItemsData = async () => {
    fetch(`/api/postitems`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(e => console.log(e.message));
  };

  useEffect(() => {
    const getSinglePostData = () => {
      fetch(`/api/postitems/${id}`)
        .then(res => res.json())
        .then(data => setItem(data))
        .catch(e => console.log(e.message));
    };

    getSinglePostData();
    getItemsData();
  }, [id]);

  // Function to handle delete action
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`/userdashboard/api/postitems/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Post deleted successfully!');
          // Redirect or update state as needed, e.g., navigate back
          window.location.href = `/userdashboard/${id}`; // Redirect to homepage or appropriate route
        } else {
          alert('Failed to delete post.');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleEdit = () => {
    // Navigate to the edit page, passing the post ID
    window.location.href = `/userdashboard/updatepostitem/${id}`; // Adjust this URL as per your routing
  };

  return (
    <main id="main">
      <section className="single-post-content">
        <div className="container">
          <div className="row">
            <div className="col-md-9 post-content">
              {item && item.category !== '' ? (
                <div className="single-post">
                  <div className="post-meta">
                    <span className="date">{item.category}</span>
                    <span className="mx-1"><i className="bi bi-dot"></i></span>
                    <span>{new Date(item.date).toLocaleDateString('en-US')}</span>
                  </div>
                  <h1 className="mb-5">{item.title}</h1>
                  <p className="justified-paragraph">
                    <span className="firstcharacter">
                      {item.brief && item.brief.charAt(0)}
                    </span>
                    {item.brief && item.brief.substring(1)}
                  </p>
                  <p className="justified-paragraph">{item.description}</p>
                  <div className="image-container">
                    <figure className="styled-figure my-5">
                      <Image
                        src={`/${item.img}`}
                        alt="Descriptive alt text"
                        className="img-fluid"
                        width={100}  // Reduced width
                        height={100} // Reduced height
                        layout="responsive"
                      />
                      <figcaption>
                        {item.figcaption}
                      </figcaption>
                    </figure>
                  </div>

                  <div className="justified-paragraph">
                    {item.paragraphs.map((paragraph, index) => (
                      <p key={index} style={{ marginBottom: '1em' }}>
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="action-buttons mt-4">
                    <button className="btn btn-primary me-2" onClick={handleEdit}>
                      <FontAwesomeIcon icon={faEdit} className="me-1" />
                      Update
                    </button>
                    <button className="btn btn-danger" onClick={handleDelete}>
                      <FontAwesomeIcon icon={faTrash} className="me-1" />
                      Delete
                    </button>
                  </div>
                </div>
              ) : <Preloader />}
            </div>
            <div className="col-md-3">
              <div className="aside-block">
                <ul className="nav nav-pills custom-tab-nav mb-4">
                  {
                    tabs.map(tab => (
                      <li className="nav-item" key={tab.id}>
                        <button className={`nav-link ${tab.active ? 'active' : undefined}`}
                          onClick={() => handleTabActive(tab.id)}>{tab.name}</button>
                      </li>
                    ))
                  }
                </ul>
                <div className="tab-content">
                  <div className={`tab-pane fade ${tabs[0].active ? 'show active' : ''}`}>
                    {items.slice(0, 6).map((item: PostProps) => (
                      <SidePostItem key={item._id} item={item} />
                    ))}
                  </div>
                  <div className={`tab-pane fade ${tabs[1].active ? 'show active' : ''}`}>
                    {items.slice(6, 12).map((item: PostProps) => (
                      <SidePostItem key={item._id} item={item} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="aside-block">
                <h3 className="aside-title">Video</h3>
                <div className="video-post">
                  <a target="_blank"
                    href="https://www.youtube.com"
                    className="link-video">
                    <span className="bi-play"></span>
                    <Image
                      src="/assets/img/post-landscape-3.jpg"
                      alt=""
                      className="img-fluid"
                      width={300}
                      height={200}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
