'use client';

import { useState } from "react";
import React from "react";

export const initialState = {
  title: '',
  img: '',
  category: '',
  author: '',
  brief: '',
  avatar: '',          // Optional field for author's avatar
  top: false,          // Boolean flag for featured article
  trending: false,     // Boolean flag for trending article
  description: '',     // Required field for detailed description
  figcaption: '',      // Optional field for image caption
  paragraphs: [] as string[], // Explicitly declare paragraphs as string[]
  validate: '',
};

export default function CreatePostItem() {
  const [text, setText] = useState<typeof initialState>(initialState); // Set state type

  // Handle input changes
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setText((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      validate: '',
    }));
  };

  // Handle paragraphs input (for adding multiple paragraphs)
  const handleParagraphChange = (index: number, value: string) => {
    const updatedParagraphs = [...text.paragraphs]; // Make a copy of paragraphs
    updatedParagraphs[index] = value; // Update the specific paragraph
    setText((prev) => ({
      ...prev,
      paragraphs: updatedParagraphs,
      validate: '',
    }));
  };

  // Add a new paragraph input field
  const addParagraph = () => {
    setText((prev) => ({
      ...prev,
      paragraphs: [...prev.paragraphs, ''], // Add an empty paragraph
      validate: '',
    }));
  };

  // Form submission handler
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple form validation
    if (!text.title || !text.img || !text.category || !text.brief || !text.description) {
      setText((prev) => ({ ...prev, validate: 'incomplete' }));
      return;
    }

    // Update validate state to show loading
    setText((prev) => ({ ...prev, validate: 'loading' }));

    try {
      const response = await fetch('/api/postitems', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(text),
      });

      if (response.ok) {
        setText({ ...initialState, validate: 'success' });
      } else {
        setText((prev) => ({ ...prev, validate: 'error' }));
      }
    } catch (error) {
      console.error('Error:', error);
      setText((prev) => ({ ...prev, validate: 'error' }));
    }
  };

  return (
    <main id="main" className="bg-light py-5">
      <section className="create-post-content">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow-sm">
                <div className="card-header text-center">
                  <h1 className="page-title">Create New Post</h1>
                </div>
                <div className="card-body">
                  <form onSubmit={handleFormSubmit}>
                    {/* Basic Information Section */}
                    <div className="mb-4">
                      <h4>Basic Information</h4>
                      <hr />
                      <div className="mb-3">
                        <label className="form-label">Title <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          name="title"
                          value={text.title}
                          onChange={handleTextChange}
                          className="form-control"
                          placeholder="Enter Title"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Image URL <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          name="img"
                          value={text.img}
                          onChange={handleTextChange}
                          className="form-control"
                          placeholder="Enter Image URL"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Category <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          name="category"
                          value={text.category}
                          onChange={handleTextChange}
                          className="form-control"
                          placeholder="Enter Post Category"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Author</label>
                        <input
                          type="text"
                          name="author"
                          value={text.author}
                          onChange={handleTextChange}
                          className="form-control"
                          placeholder="Enter Author Name"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Brief</label>
                        <textarea
                          className="form-control"
                          name="brief"
                          value={text.brief}
                          onChange={handleTextChange}
                          placeholder="Enter Post Brief"
                          rows={3}
                        />
                      </div>
                    </div>

                    {/* Detailed Description Section */}
                    <div className="mb-4">
                      <h4>Detailed Description</h4>
                      <hr />
                      <div className="mb-3">
                        <label className="form-label">Description <span className="text-danger">*</span></label>
                        <textarea
                          className="form-control"
                          name="description"
                          value={text.description}
                          onChange={handleTextChange}
                          placeholder="Enter Detailed Description"
                          rows={5}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Figcaption</label>
                        <input
                          type="text"
                          name="figcaption"
                          value={text.figcaption}
                          onChange={handleTextChange}
                          className="form-control"
                          placeholder="Enter Image Caption"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Avatar (optional)</label>
                        <input
                          type="text"
                          name="avatar"
                          value={text.avatar}
                          onChange={handleTextChange}
                          className="form-control"
                          placeholder="Enter Author's Avatar URL"
                        />
                      </div>

                      {/* Checkbox Inputs for Top and Trending */}
                      <div className="form-check mb-3">
                        <input
                          type="checkbox"
                          name="top"
                          checked={text.top}
                          onChange={handleTextChange}
                          className="form-check-input"
                        />
                        <label className="form-check-label">Top</label>
                      </div>
                      <div className="form-check mb-3">
                        <input
                          type="checkbox"
                          name="trending"
                          checked={text.trending}
                          onChange={handleTextChange}
                          className="form-check-input"
                        />
                        <label className="form-check-label">Trending</label>
                      </div>
                    </div>

                    {/* Paragraphs Section */}
                    <div className="mb-4">
                      <h4>Paragraphs</h4>
                      <hr />
                      {text.paragraphs.map((paragraph, index) => (
                        <div key={index} className="mb-2">
                          <textarea
                            className="form-control"
                            value={paragraph}
                            onChange={(e) => handleParagraphChange(index, e.target.value)}
                            placeholder={`Enter Paragraph ${index + 1}`}
                            rows={3}
                          />
                        </div>
                      ))}
                      <button type="button" className="btn btn-outline-secondary mb-3" onClick={addParagraph}>
                        Add Paragraph
                      </button>
                    </div>

                    {/* Feedback messages */}
                    <div className="mb-3">
                      {text.validate === 'loading' && (
                        <div className="alert alert-info">Sending Post...</div>
                      )}
                      {text.validate === 'incomplete' && (
                        <div className="alert alert-danger">Please fill in all required fields.</div>
                      )}
                      {text.validate === 'success' && (
                        <div className="alert alert-success">Your news post was successfully created. Thank you!</div>
                      )}
                      {text.validate === 'error' && (
                        <div className="alert alert-danger">An error occurred. Please try again later.</div>
                      )}
                    </div>

                    {/* Submit button */}
                    <div className="d-flex justify-content-center">
                      <input
                        type="submit"
                        className="btn btn-primary w-50"
                        value="Create Post"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
