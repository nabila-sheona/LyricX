import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Home';
import SearchLyrics from './SearchSong';
import SearchSongs from './SearchByAlbum';
import RootLayout from './RootLayout';

function App() {
  return (
    <Router>
      <RootLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchLyrics />} />
          <Route path="/album" element={<SearchSongs />} />
        </Routes>
      </RootLayout>
    </Router>
  );
}

export default App;
