/* Task 2 + Task 4
Local module that exports calculateDiscount and applyCoupon

Task 2: calculateDiscount(price, percent)
Task 4: applyCoupon(price, couponCode) - flat 100 off if code is SAVE100

Hint: Use module.exports to export multiple functions. */

function calculateDiscount(price, percent) {
    let discount = price * (percent / 100);
    let finalPrice = price - discount;
    return finalPrice;
}

function applyCoupon(price, couponCode) {
    if (couponCode === "SAVE100") {
        return price - 100;
    } else {
        console.log("Invalid coupon code");
        return price;
    }
}

module.exports = {
    calculateDiscount,
    applyCoupon
};
