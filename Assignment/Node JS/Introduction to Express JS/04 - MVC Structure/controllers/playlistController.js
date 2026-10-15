const { getAllPlaylists, addPlaylist } = require('../models/playlistModel');

const getPlaylists = (req, res) => {
    const playlists = getAllPlaylists();
    res.json(playlists);
};

const createPlaylist = (req, res) => {
    const { name, songs } = req.body;
    const newPlaylist = { name, songs };
    addPlaylist(newPlaylist);
    res.status(201).json(newPlaylist);
};

module.exports = {
    getPlaylists,
    createPlaylist
};