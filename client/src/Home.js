// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file for styles

export default function Home() {
    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to the Lyric Search App!</h1>
            <p className="home-description">
                Discover your favorite songs and their lyrics easily. 
                Search by song name or album to find what you're looking for!
            </p>
            <Link to="/search" className="home-button">
                Start Searching
            </Link>
        </div>
    );
}
