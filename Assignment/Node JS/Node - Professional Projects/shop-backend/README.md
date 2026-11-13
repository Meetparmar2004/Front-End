# shop-backend

A small Express API for browsing products and managing one in-memory demo
shopping cart. The cart resets when the server restarts.

## Run

```bash
npm install
npm start
```

The server listens on `http://localhost:3000` by default. Set `PORT` to use
another port.

## Endpoints

- `GET /products` lists the three sample products.
- `GET /products/search?q=headphones` searches product names without regard
  to letter case.
- `POST /cart` adds a quantity to the cart. Send JSON such as
  `{"productId": 1, "quantity": 2}`. Re-adding a product increases its
  quantity.
- `GET /cart/total` returns cart items, subtotal, a 5% delivery charge, and
  the final total.

The exported `addToCart(productId, quantity)` function is implemented in
`src/cart.js`. Every request is logged with its HTTP method and URL.
