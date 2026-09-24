/* Task 2 + Task 4
Import discountCalculator module and use it for Flipkart-style cart.

Cart total: Rs 1500 with 10% discount
Then apply SAVE100 coupon for flat Rs 100 off */

const { calculateDiscount, applyCoupon } = require('./discountCalculator');

let cartTotal = 1500;
let percent = 10;

console.log("Flipkart Cart Total: Rs", cartTotal);

let afterDiscount = calculateDiscount(cartTotal, percent);
console.log("After 10% discount: Rs", afterDiscount);

let finalPrice = applyCoupon(afterDiscount, "SAVE100");
console.log("After SAVE100 coupon: Rs", finalPrice);

// To run : node app.js
