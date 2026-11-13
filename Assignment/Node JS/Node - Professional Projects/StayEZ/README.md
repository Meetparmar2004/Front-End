# StayEZ

A simple Express vacation rental API. The five sample room prices are in INR
per night.

## Run

```bash
npm install
npm start
```

The server listens on `http://localhost:3000` by default. Set `PORT` to use
another port.

## Endpoints

- `GET /` returns `Welcome to StayEZ`.
- `GET /rooms` returns five sample rooms.
- `GET /rooms/search?location=goa` searches locations case-insensitively and
  supports partial matches.

The `Room` model is defined in `room.js`.
