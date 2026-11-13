# insta-clone

A small Express API with seeded profile and post data. Posts and likes are
stored in memory and reset when the server restarts.

## Run

```bash
npm install
npm start
```

The API listens on `http://localhost:3000` by default. Set `PORT` to use
another port.

## Project structure

- `src/app.js` configures Express and registers routes.
- `src/server.js` starts the HTTP server.
- `src/data.js` contains the in-memory profiles and seeded posts.
- `src/routes/` contains the profile and post endpoints.

## Endpoints

- `GET /profile` returns the default profile. Use `GET /profile?username=leo.cooks`
  to look up another seeded profile.
- `POST /post` creates a post. Send JSON with `imageUrl` and `caption`;
  `username` is optional and defaults to `maya.travels`.
- `GET /feed` returns seeded and new posts, newest first.
- `POST /like` increments a post's likes. Send JSON such as
  `{"postId": 10}`.
