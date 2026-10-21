import { useEffect, useState } from 'react';

const API = 'http://localhost:5000';

// Task 4: show an alert when the backend sends an error
async function requestJSON(url, options) {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      alert(data.message || 'Something went wrong');
      return null;
    }

    return data;
  } catch (error) {
    alert('Could not reach the server. Please check that the backend is running.');
    console.log(error);
    return null;
  }
}

function App() {
  const [playlistName, setPlaylistName] = useState('');
  const [playlistMessage, setPlaylistMessage] = useState('');

  const [restaurantName, setRestaurantName] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [rating, setRating] = useState('');
  const [savedRestaurant, setSavedRestaurant] = useState(null);

  const [movies, setMovies] = useState([]);

  async function loadMovies() {
    const data = await requestJSON(API + '/movies');

    if (data) {
      setMovies(data);
    }
  }

  useEffect(() => {
    loadMovies();
  }, []);

  async function savePlaylist(event) {
    event.preventDefault();

    const data = await requestJSON(API + '/playlists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: playlistName })
    });

    if (data) {
      setPlaylistMessage(data.message);
      setPlaylistName('');
    }
  }

  async function saveRestaurant(event) {
    event.preventDefault();

    const data = await requestJSON(API + '/restaurants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: restaurantName,
        cuisine: cuisine,
        rating: Number(rating)
      })
    });

    if (data) {
      setSavedRestaurant(data);
      setRestaurantName('');
      setCuisine('');
      setRating('');
    }
  }

  return (
    <main>
      <h1>Connecting Full MERN Flow</h1>

      <section>
        <h2>Add a playlist</h2>
        <form onSubmit={savePlaylist}>
          <label htmlFor="playlistName">Playlist name</label>
          <input
            id="playlistName"
            value={playlistName}
            onChange={(event) => setPlaylistName(event.target.value)}
            required
          />
          <button type="submit">Save playlist</button>
        </form>
        {playlistMessage && <p className="success">{playlistMessage}</p>}
      </section>

      <section>
        <h2>Add a restaurant</h2>
        <form onSubmit={saveRestaurant}>
          <label htmlFor="restaurantName">Name</label>
          <input
            id="restaurantName"
            value={restaurantName}
            onChange={(event) => setRestaurantName(event.target.value)}
            required
          />

          <label htmlFor="cuisine">Cuisine</label>
          <input
            id="cuisine"
            value={cuisine}
            onChange={(event) => setCuisine(event.target.value)}
            required
          />

          <label htmlFor="rating">Rating</label>
          <input
            id="rating"
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
            required
          />

          <button type="submit">Save restaurant</button>
        </form>

        {savedRestaurant && (
          <div className="saved">
            <h3>Saved restaurant</h3>
            <p>Name: {savedRestaurant.name}</p>
            <p>Cuisine: {savedRestaurant.cuisine}</p>
            <p>Rating: {savedRestaurant.rating}</p>
            <p>Id: {savedRestaurant._id}</p>
          </div>
        )}
      </section>

      <section>
        <h2>Movies</h2>
        <button type="button" onClick={loadMovies}>Refresh movies</button>
        {movies.length === 0 ? (
          <p>No movies yet.</p>
        ) : (
          <ul>
            {movies.map((movie) => (
              <li key={movie._id}>
                {movie.title} ({movie.year})
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
