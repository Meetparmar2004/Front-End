# Playlist App

A simple Express server with an in-memory playlist.

## Run

```bash
npm install
npm start
```

The server listens on `http://localhost:3000` by default. Set `PORT` to use
another port.

## Endpoints

- `GET /` returns `Welcome to Playlist App`.
- `GET /songs` returns the current song list.
- `POST /songs` adds a song and returns the updated list. Send JSON with a
  non-empty `title`, a non-empty `artist`, and a positive numeric `duration`
  in seconds.

Invalid song data returns HTTP 400 with field-specific validation errors.
Songs are stored in memory and reset when the server restarts.
