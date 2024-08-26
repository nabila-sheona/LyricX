const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    name: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
    lyrics: { type: String, required: true }
});

const Song = mongoose.model('Song', songSchema);
module.exports = Song;
