let playlists = [ 
    { 
        name: "Chill Vibes", 
        songs: 25 
    }, 
    { 
        name: "Top Hits", 
        songs: 40 
    }, 
    { 
        name: "Workout Beats", 
        songs: 30 
    } ];

const getAllPlaylists = () => {
    return playlists;
}

const addPlaylist = (playlist) => {
    playlists.push(playlist);
    return playlist;
}

module.exports = {
    getAllPlaylists,
    addPlaylist
}