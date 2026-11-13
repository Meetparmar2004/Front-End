# OLX Product App

A small Express API for managing in-memory product listings and uploading
product images.

## Run

```bash
npm install
npm start
```

The API listens on `http://localhost:3000` by default. Set `PORT` to use
another port.

## Endpoints

- `GET /products` lists the three sample products.
- `POST /add-product` adds a product. Send JSON with `title`, numeric `price`,
  and `imageUrl`; the updated list is returned.
- `GET /products/:id` returns one product or a 404 JSON message.
- `DELETE /products/:id` removes a product and returns the updated list.
- `POST /upload-image` accepts a multipart `image` file field and returns its
  URL. JPEG, PNG, and WebP files up to 5 MB are supported.

Product data is stored in memory and resets when the server restarts.

## Image upload security consideration

The upload example checks the MIME type provided by the client, but that value
can be spoofed. Before production use, inspect the file's actual signature
(magic bytes) on the server and reject files whose contents do not match an
allowed image format.
