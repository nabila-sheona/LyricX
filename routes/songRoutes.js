const express = require('express');
const router = express.Router();
const { searchSongByName, searchSongsByAlbum } = require('../controllers/songController');

// Route to search for a song by name
router.get('/songs/:name', searchSongByName);

// Route to search for songs by album name
router.get('/albums/:name', searchSongsByAlbum);

module.exports = router;
