const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const Song = require('./models/Song'); // Import the Song model
require('dotenv').config(); // Load environment variables from .env file

const app = express();
// Resolve the absolute path

// Enable CORS
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// MongoDB connection
mongoose.connect(process.env.DATABASE_URL, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
})
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch(err => {
    console.error("MongoDB connection error:", err);
});

// API Routes
// Route to search for a song by name
app.get('/api/songs/:name', async (req, res) => {
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
});

// Route to search for songs by album name
app.get('/api/albums/:name', async (req, res) => {
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
});



const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}



  

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
