const products = require("./data/products");

const cart = [];

function addToCart(productId, quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new RangeError("quantity must be a positive integer");
  }

  const product = products.find((item) => item.id === Number(productId));
  if (!product) {
    return null;
  }

  const cartItem = cart.find((item) => item.productId === product.id);
  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cart.push({ productId: product.id, quantity });
  }

  return getCart().find((item) => item.id === product.id);
}

function getCart() {
  return cart.map(({ productId, quantity }) => {
    const product = products.find((item) => item.id === productId);
    return { ...product, quantity };
  });
}

module.exports = { addToCart, getCart };
