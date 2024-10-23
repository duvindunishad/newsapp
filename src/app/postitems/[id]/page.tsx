'use client'
import { useEffect ,useState } from "react"
import React from 'react'
import './style.css'
import Image from "next/image";
import Preloader from "@/components/Preloader";
import SidePostItem from "@/components/SidePostItem";

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
    paragraphs: [],  // Initialize paragraphs as an empty array
    top: undefined,
    trending: undefined
  };
  

export default function PostItem({params} : {params: {id: string}}) {

    const id : string = params.id;

    const [item, setItem] = useState(initialPost);
    const  [items, setItems] = useState ([]);

    const tabsData = [
      {id:1, name: 'Popular', active: true},
      {id:2, name: 'Trending', active: false},
    ];

    const [tabs, setTabs] = useState(tabsData);

    const handleTabActive = (id: number):void=>{
      setTabs(tabsData.map(tab =>{
        tab.active = false;
        if(tab.id ===id) tab.active = true;
        return tab;
      }))
    }

    const getItemsData = async () => {
      fetch(`/api/postitems`)
        .then(res => res.json())
        .then(data => setItems(data))
        .catch(e => console.log(e.message));
    };

    useEffect(()=>{
        const getSinglePostData = () =>{
            fetch(`/api/postitems/${id}`)
            .then(res => res.json())
            .then(data => setItem(data))
            .catch(e => console.log(e.message));
        };

        getSinglePostData();
        getItemsData();
    },[id]);

  return (
    <main id="main">
        <section className="single-post-content">
            <div className="container">
                <div className="row">
                    <div className="col-md-9 post-content">
                        {item&& item.category !== '' ? (<div className="single-post">
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
                            {/* <p>Artificial intelligence is transforming the world of modern art, blending human creativity with computational power in unprecedented ways. AI-generated art has become a novel medium where algorithms, deep learning models, and neural networks analyze vast data sets of existing artworks to create entirely new pieces. Artists use AI tools to explore patterns, textures, and compositions beyond human capabilities, fostering a collaborative dynamic between the machine and the artist. This fusion is not about replacing human creativity but enhancing it, offering fresh perspectives and pushing the boundaries of imagination in digital art, music, literature, and design. As AI continues to evolve, it opens doors to innovative approaches, challenging traditional notions of authorship and originality, and paving the way for a new artistic frontier.

                            </p> */}
                            <p className="justified-paragraph">{item.description}</p>
                            <div className="image-container">
  <figure
    className="styled-figure my-5"
  >
    <Image
      src={`/${item.img}`}
      alt="Descriptive alt text"
      className="img-fluid"
      width={100}  // Reduced width
      height={100} // Reduced height
      layout="responsive"
    />
    <figcaption >
      {item.figcaption}
    </figcaption>
  </figure>
</div>


{/* <figure className="my-5">
                                <img src={`/${item.img}`} alt="" className="img-fluid" />
                                <figcaption>
                                Artificial intelligence is transforming the world of modern art, blending human creativity with computational power in unprecedented ways. AI-generated art has become a novel medium where algorithms, deep learning models, 
                                </figcaption>
                            </figure> */}

                        {/* <p>Artificial intelligence is transforming the world of modern art, blending human creativity with computational power in unprecedented ways. AI-generated art has become a novel medium where algorithms, deep learning models, and neural networks analyze vast data sets of existing artworks to create entirely new pieces. Artists use AI tools to explore patterns, textures, and compositions beyond human capabilities, fostering a collaborative dynamic between the machine and the artist. This fusion is not about replacing human creativity but enhancing it, offering fresh perspectives and pushing the boundaries of imagination in digital art, music, literature, and design. As AI continues to evolve, it opens doors to innovative approaches, challenging traditional notions of authorship and originality, and paving the way for a new artistic frontier.</p>
                        <p>Artificial intelligence is transforming the world of modern art, blending human creativity with computational power in unprecedented ways. AI-generated art has become a novel medium where algorithms, deep learning models, and neural networks analyze vast data sets of existing artworks to create entirely new pieces. Artists use AI tools to explore patterns, textures, and compositions beyond human capabilities, fostering a collaborative dynamic between the machine and the artist. This fusion is not about replacing human creativity but enhancing it, offering fresh perspectives and pushing the boundaries of imagination in digital art, music, literature, and design. As AI continues to evolve, it opens doors to innovative approaches, challenging traditional notions of authorship and originality, and paving the way for a new artistic frontier.</p>
                        <p>Artificial intelligence is transforming the world of modern art, blending human creativity with computational power in unprecedented ways. AI-generated art has become a novel medium where algorithms, deep learning models, and neural networks analyze vast data sets of existing artworks to create entirely new pieces. Artists use AI tools to explore patterns, textures, and compositions beyond human capabilities, fostering a collaborative dynamic between the machine and the artist. This fusion is not about replacing human creativity but enhancing it, offering fresh perspectives and pushing the boundaries of imagination in digital art, music, literature, and design. As AI continues to evolve, it opens doors to innovative approaches, challenging traditional notions of authorship and originality, and paving the way for a new artistic frontier.</p>
                        <p>Artificial intelligence is transforming the world of modern art, blending human creativity with computational power in unprecedented ways. AI-generated art has become a novel medium where algorithms, deep learning models, and neural networks analyze vast data sets of existing artworks to create entirely new pieces. Artists use AI tools to explore patterns, textures, and compositions beyond human capabilities, fostering a collaborative dynamic between the machine and the artist. This fusion is not about replacing human creativity but enhancing it, offering fresh perspectives and pushing the boundaries of imagination in digital art, music, literature, and design. As AI continues to evolve, it opens doors to innovative approaches, challenging traditional notions of authorship and originality, and paving the way for a new artistic frontier.</p> */}
                        
<div className="justified-paragraph">
    {item.paragraphs.map((paragraph, index) => (
        <p key={index} style={{ marginBottom: '1em' }}>
            {paragraph}
        </p>
    ))}
</div>

                        </div>): <Preloader/>}
                    </div>
                    <div className="col-md-3">
                      <div className="aside-block">
                        <ul className="nav nav-pills custom-tab-nav mb-4">
                        {
                          tabs.map(tab=>(
                            <li className="nav-item" key={tab.id}>
                              <button className={`nav-link ${tab.active ? 'active': undefined}`}
                              onClick={()=> handleTabActive(tab.id)}>{tab.name}</button>
                            </li>
                          ))
                        }
                        </ul>
                        <div className="tab-content">
                          <div className={`tab-pane fade ${tabs[0].active ? 'show active' : ''}`}>
                            {items.slice(0, 6).map((item: PostProps) => (
                              <SidePostItem key={item._id} item={item}/>
                            ))}
                          </div>
                          <div className={`tab-pane fade ${tabs[1].active ? 'show active' : ''}`}>
                            {items.slice(6, 12).map((item: PostProps) => (
                              <SidePostItem key={item._id} item={item}/>
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
                            {/* <img src="/assets/img/post-landscape-3.jpg" alt="" className="img-fluid"/> */}
                          </a>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
  )
}