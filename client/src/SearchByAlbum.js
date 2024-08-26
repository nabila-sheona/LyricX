import React, { useState } from 'react';
import axios from 'axios';
//import './App.css'; 
import './SearchSong.css';

const albums = [
  { name: 'Taylor Swift', color: 'bg-gradient-to-r from-blue-500 to-green-300' },
  { name: 'Fearless', color: 'bg-gradient-to-r from-yellow-100 to-yellow-400' },
  { name: 'Speak Now', color: 'bg-gradient-to-r from-purple-400 to-purple-600' },
  { name: 'Red', color: 'bg-gradient-to-r from-red-400 to-red-600' },
  { name: '1989', color: 'bg-gradient-to-r from-indigo-100 to-blue-400' },
  { name: 'reputation', color: 'bg-gradient-to-r from-gray-900 to-gray-600' },
  { name: 'Lover', color: 'bg-gradient-to-r from-pink-400 to-purple-400' },
  { name: 'folklore', color: 'bg-gradient-to-r from-amber-500 to-amber-900' },
  { name: 'evermore', color: 'bg-gradient-to-r from-green-200 to-green-400' },
  { name: 'Midnights', color: 'bg-gradient-to-r from-blue-400 to-blue-900' },
  { name: 'The Tortured Poets Department', color: 'bg-gradient-to-r from-gray-400 to-gray-600' },
];


const SearchByAlbum = () => {
    const [albumName, setAlbumName] = useState('');
    const [songs, setSongs] = useState([]);
    const [error, setError] = useState('');
    const [theme, setTheme] = useState({ background: '', color: '' });

   const searchAlbum = async (album = '') => {
    try {
        setError('');
         const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/albums/${encodeURIComponent( album || albumName)}`);
        if (response.data.songs) { // Check if songs exists in the response
            setSongs(response.data.songs);
        } else {
            setSongs([]);
            setError('Album not found');
        }
        const selectedAlbum = albums.find(a => a.name === (album || albumName));
        if (selectedAlbum) {
            setTheme({ background: selectedAlbum.color, color: '#fff' }); // Update theme
        }
    } catch (error) {
        console.error('Error fetching songs:', error);
        setSongs([]);
        setError('Album not found');
    }
};

    return (
        <div className={`s-container ${theme.background}`}>
            <h1 className="s-title">Search for Songs by Album</h1>
            <div className="search-section">
                <input
                    type="text"
                    className="input"
                    value={albumName}
                    onChange={(e) => setAlbumName(e.target.value)}
                    placeholder="Enter album name"
                />
                <button className={`s-button ${theme.background}`} onClick={() => searchAlbum()}>
                    Search
                </button>
            </div>
            
            <div className="album-buttons">
                {albums.map((album, index) => (
                    <button
                        key={index}
                        className={`${album.color}`}
                        onClick={() => searchAlbum(album.name)}
                    >
                        {album.name}
                    </button>
                ))}
            </div>

            <div className="results">
                {error && <div className="error">{error}</div>}
                {songs.length > 0 && (
                    <div className="resultItem" style={{ background: theme.color }}>
                        <ul>
                            {songs.map((song, index) => (
                                <li key={index}>{song.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchByAlbum;
