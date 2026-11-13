class Song {
  constructor(title, artist, duration) {
    this.title = title;
    this.artist = artist;
    this.duration = duration;
  }
}

const songs = [
  new Song("Golden Hour", "JVKE", 209),
  new Song("Levitating", "Dua Lipa", 203),
  new Song("Blinding Lights", "The Weeknd", 200)
];

module.exports = { Song, songs };
