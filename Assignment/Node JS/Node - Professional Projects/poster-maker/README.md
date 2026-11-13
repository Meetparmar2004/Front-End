# poster-maker

A small Express app for browsing poster templates, creating designs, changing
their background color, and uploading image assets.

## Run

```bash
npm install
npm start
```

The app listens on `http://localhost:3000` by default. Set `PORT` to use
another port.

## Endpoints

- `GET /` serves the static app page.
- `GET /templates` returns five sample poster templates.
- `POST /design` creates a design. Send JSON such as
  `{"text":"Make today count","templateId":1}`.
- `PATCH /design/:designId/color` updates a design's background color. Send
  JSON such as `{"backgroundColor":"#f5c542"}`. Colors must be 3- or 6-digit
  hex values.
- `POST /upload` accepts a multipart form with an `image` file field. JPEG,
  PNG, and WebP files up to 5 MB are supported. The returned URL is served by
  the app under `/uploads/`.

Designs are stored in memory and reset when the server restarts. Uploaded
files are saved in `public/uploads/`.
