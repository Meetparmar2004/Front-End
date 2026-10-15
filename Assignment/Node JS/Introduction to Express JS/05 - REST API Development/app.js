const express = require('express');

const app = express();

app.use(express.json());

let tracks = [ 
    { 
        id: 1,
        name: "Blinding Lights", 
        artist: "The Weeknd" 
    },
    { 
        id: 2, 
        name: "Shape of You", 
        artist: "Ed Sheeran" 
    }, 
    { 
        id: 3, 
        name: "Levitating", 
        artist: "Dua Lipa" 
    } ];

app.get('/tracks', (req, res) => {
    res.status(200).json(tracks);
});

app.post('/tracks', (req, res) => {
    const { name, artist } = req.body;
    if (!name || !artist) {
        return res.status(400).json({ error: 'Name and artist are required' });
    }

    const newId = tracks.length > 0 ? Math.max(...tracks.map(track => track.id)) + 1 : 1; 
    const newTrack = { id: newId, name: name, artist: artist };
        tracks.push(newTrack);
        res.status(201).json(newTrack);
});

app.delete('/tracks/:id', (req, res) => {
    const trackId = parseInt(req.params.id);
    const trackIndex = tracks.findIndex(track => track.id === trackId);
    if (trackIndex === -1) {
        return res.status(404).json({ error: 'Track not found' });
    }
    tracks.splice(trackIndex, 1);
    res.status(200).json({ message: 'Track deleted successfully' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});