import React, { useState } from 'react';
import axios from 'axios';
import './SearchSong.css'; // Import specific styles for search song
import html2canvas from 'html2canvas'; // Import html2canvas

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

const SongSearch = () => {
    const [songName, setSongName] = useState('');
    const [name, setName] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [lyrics, setLyrics] = useState('');
    const [error, setError] = useState(''); // State for error message
    const [theme, setTheme] = useState('');

    const searchSong = async () => {
        try {
            setError(''); // Clear previous errors
            
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/songs/${encodeURIComponent( songName)}`);

            const { name, lyrics, artist, album } = response.data;
            setName(name);
            setLyrics(lyrics);
            setArtist(artist);
            setAlbum(album);

            const selectedAlbum = albums.find(a => a.name.toLowerCase() === album.toLowerCase());
            if (selectedAlbum) {
                setTheme(selectedAlbum.color);
            } else {
                console.warn('Album not found in predefined list');
                setTheme(''); // Clear theme if not found
            }

        } catch (error) {
            console.error('Error fetching song:', error);
            setLyrics(''); // Clear previous lyrics
            setArtist(''); // Clear previous artist
            setAlbum(''); // Clear previous album
            setError('Song not found'); // Set error message
        }
    };

    const downloadLyrics = () => {
        const element = document.querySelector('.s-lyrics'); // Select the lyrics box
        if (element) {
            html2canvas(element).then(canvas => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = `${name || 'lyrics'}.png`; // Use songName as the file name
                link.click();
            });
        }
    };

    return (
        <div className={`s-container ${theme}`}>
            <h1 className="s-title">Search Lyrics</h1>
            <div>
                <input
                    type="text"
                    className="input"
                    value={songName}
                    onChange={(e) => setSongName(e.target.value)}
                    placeholder="Enter song name"
                />
                <button className={`s-button ${theme}`} onClick={searchSong}>
                    Search
                </button>
            </div>
            <div className={`s-results ${theme}`}>
                {error && <div className="error">{error}</div>} {/* Show error if exists */}
                {lyrics && (
                    <div className={`s-resultItem ${theme}`}>
                        <div className={`s-lyrics ${theme}`}>
                            <div className={`ss-resultItem ${theme}`}>
                                <div className="info">
                                    <div className="artist"><strong>Artist:</strong> {artist}</div>
                                    <div className="song-name"><strong>Song:</strong> {name}</div>
                                    <div className="album"><strong>Album:</strong> {album}</div>
                                </div>
                                {lyrics} {/* Show lyrics */}
                            </div>
                        </div>
                        <button className={`download-button ${theme}`} onClick={downloadLyrics}>
                            Download Lyrics as PNG
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SongSearch;
