'use client';
import Image from 'next/image';
import React from 'react';

const About = () => {
  return (
    <div className="about-page bg-light text-dark py-5 mt-5">
      <div className="container">
        {/* Header Section */}
        <div className="row text-center mb-5">
          <div className="col">
            <h1 className="display-4 font-weight-bold text-secondary">About Us</h1>
            <p className="lead text-secondary">Discover Our Journey, Mission, and Team</p>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="row mb-5">
          <div className="col-md-6 text-center text-md-left mb-4 mb-md-0">
            <h2 className="text-secondary font-weight-bold">Our Story</h2>
            <p className="text-secondary">
              Launched with a passion for insightful content and authentic engagement, we created this blog to share stories, ideas, and expert advice that inspire and inform. Every post is crafted to be a meaningful addition to our readers lives.
            </p>
          </div>
          <div className="col-md-6">
            <Image
              src="/assets/img/our-story.jpg"
              alt="Our Story"
              width={500}
              height={200}
              className="rounded shadow-sm"
            />
          </div>
        </div>

        {/* Mission Section */}
        <div className="row bg-white p-5 rounded shadow-sm mb-5">
          <div className="col">
            <h2 className="text-center text-secondary font-weight-bold">Our Mission</h2>
            <p className="text-center text-secondary">
              Our mission is simple: to inspire and empower our readers through thoughtfully curated content.
            </p>
          </div>
        </div>

        {/* Meet the Team Section */}
        <div className="row mb-5">
          <div className="col">
            <h2 className="text-center text-secondary font-weight-bold">Meet the Team</h2>
            <p className="text-center text-secondary mb-4">
              Our dedicated team is at the heart of everything we create. Get to know the passionate minds behind our content.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 text-center mb-4">
            <div className="card border-0 shadow-sm">
              <Image
                src="/assets/img/person-3.jpg"
                alt="Team Member"
                width={300}
                height={300}
                className="rounded-circle mx-auto mt-3"
              />
              <div className="card-body">
                <h5 className="card-title font-weight-bold">Jane Doe</h5>
                <h6 className="card-subtitle text-muted mb-2">Editor-in-Chief</h6>
                <p className="card-text">
                  Passionate about storytelling, Jane ensures every post resonates with quality and value.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 text-center mb-4">
            <div className="card border-0 shadow-sm">
              <Image
                src="/assets/img/person-4.jpg"
                alt="Team Member"
                width={300}
                height={300}
                className="rounded-circle mx-auto mt-3"
              />
              <div className="card-body">
                <h5 className="card-title font-weight-bold">John Smith</h5>
                <h6 className="card-subtitle text-muted mb-2">Lead Writer</h6>
                <p className="card-text">
                  With a keen eye for research and trends, John crafts content that both informs and captivates.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 text-center mb-4">
            <div className="card border-0 shadow-sm">
              <Image
                src="/assets/img/person-6.jpg"
                alt="Team Member"
                width={300}
                height={300}
                className="rounded-circle mx-auto mt-3"
              />
              <div className="card-body">
                <h5 className="card-title font-weight-bold">Emma Green</h5>
                <h6 className="card-subtitle text-muted mb-2">Content Strategist</h6>
                <p className="card-text">
                  Emma curates and plans our content, ensuring alignment with our mission.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Join Us Section */}
        <div className="row bg-white p-5 rounded shadow-sm mt-5">
          <div className="col text-center">
            <h2 className="text-secondary font-weight-bold">Join Our Journey</h2>
            <p className="text-secondary">
              As our blog grows, so does our community. Follow along, engage with us, and become part of our journey toward meaningful, inspiring content.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-page {
          background: #f8f9fa;
        }
      `}</style>
    </div>
  );
};

export default About;
