'use client'
import { useEffect ,useState } from "react"
import React from 'react'
import './style.css'
import Image from "next/image";
import Preloader from "@/components/Preloader";

export interface PostProps {
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
  };
  

export default function PostItem({params} : {params: {id: string}}) {

    const id : string = params.id;

    const [item, setItem] = useState(initialPost);

    const getSinglePostData = () =>{
        fetch(`/api/postitems/${id}`)
        .then(res => res.json())
        .then(data => setItem(data))
        .catch(e => console.log(e.message));
    };
    useEffect(()=>{
        getSinglePostData();
    },[]);

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
                            <p>
                                <span className="firstcharacter">
                                    {item.brief && item.brief.charAt(0)}
                                </span>
                                {item.brief && item.brief.substring(1)}
                            </p>
                            {/* <p>Artificial intelligence is transforming the world of modern art, blending human creativity with computational power in unprecedented ways. AI-generated art has become a novel medium where algorithms, deep learning models, and neural networks analyze vast data sets of existing artworks to create entirely new pieces. Artists use AI tools to explore patterns, textures, and compositions beyond human capabilities, fostering a collaborative dynamic between the machine and the artist. This fusion is not about replacing human creativity but enhancing it, offering fresh perspectives and pushing the boundaries of imagination in digital art, music, literature, and design. As AI continues to evolve, it opens doors to innovative approaches, challenging traditional notions of authorship and originality, and paving the way for a new artistic frontier.

                            </p> */}
                            <p>{item.description}</p>
                            <figure 
  className="my-5" 
  style={{
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: '#f9f9f9'
  }}
>
  <Image 
    src={`/${item.img}`} 
    alt="Descriptive alt text" 
    className="img-fluid" 
    width={100}    
    height={100}  
    layout="responsive"  
    style={{
      borderRadius: '10px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
    }}
  />
  <figcaption 
    style={{
      fontStyle: 'italic',
      color: '#555',
      marginTop: '10px',
      fontSize: '16px'
    }}
  >
    {item.figcaption}
  </figcaption>
</figure>


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
                        
<div>
    {item.paragraphs.map((paragraph, index) => (
        <p key={index} style={{ marginBottom: '1em' }}> {/* Adjust margin as needed */}
            {paragraph}
        </p>
    ))}
</div>

                        </div>): <Preloader/>}
                    </div>
                </div>
            </div>
        </section>
    </main>
  )
}