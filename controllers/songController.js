const Song = require('../models/Song');

// Controller to search for a song by name
const searchSongByName = async (req, res) => {
     try {
        const songName = req.params.name; // Get the song name from the URL
        console.log("Searching for song:", songName); // Log the song being searched
        const song = await Song.findOne({ name: new RegExp(`^${songName}$`, 'i') }); // Search for the song in the database

        if (!song) {
            console.log("Song not found"); // Log if the song is not found
            return res.status(404).json({ message: 'Song not found' });
        }

        // Return the song details
        console.log("Song found:", song); // Log the found song
        res.json({ name: song.name, lyrics: song.lyrics, artist: song.artist, album: song.album });
    } catch (error) {
        console.error("Error occurred:", error); // Log any errors
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to search for songs by album name
const searchSongsByAlbum = async (req, res) => {
  try {
        const albumName = req.params.name; // Get the album name from the URL
        const songs = await Song.find({ album: new RegExp(albumName, 'i') }); // Search for songs in the specified album

        if (songs.length === 0) {
            return res.status(404).json({ message: 'Album not found' });
        }

        // Return the list of songs in the album
        res.json({ songs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    searchSongByName,
    searchSongsByAlbum
};
