const express = require('express');
const { getPlaylists, createPlaylist } = require('../controllers/playlistController');
const router = express.Router();

router.get('/playlists', getPlaylists);
router.post('/playlists', createPlaylist);

module.exports = router;