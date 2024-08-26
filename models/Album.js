// models/Album.js
const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    name: { type: String, required: true },
    artist: { type: String, required: true },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }] // Assuming songs are linked
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
