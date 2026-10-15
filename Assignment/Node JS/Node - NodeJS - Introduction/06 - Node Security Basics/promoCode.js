/* Task 3
Simulate a Zomato-style promo code input: build a function that takes a 
promo code from the user, checks if it matches a list of allowed codes, 
and rejects any code containing special characters or spaces. */

let allowedCodes = ["ZOMATO50", "FOOD20", "SAVE100", "FREEDEL"];

function checkPromoCode(promoCode) {
    // reject if empty
    if (!promoCode) {
        return { valid: false, message: "Promo code is required" };
    }

    // reject special characters or spaces
    // only letters and numbers allowed
    let hasSpecialOrSpace = /[^a-zA-Z0-9]/.test(promoCode);

    if (hasSpecialOrSpace) {
        return { valid: false, message: "Promo code cannot have special characters or spaces" };
    }

    // check if code is in allowed list
    if (!allowedCodes.includes(promoCode.toUpperCase())) {
        return { valid: false, message: "Invalid promo code" };
    }

    return { valid: true, message: "Promo code applied! Enjoy your discount" };
}

// testing
console.log(checkPromoCode("ZOMATO50"));
console.log(checkPromoCode("FOOD 20"));      // space - reject
console.log(checkPromoCode("SAVE@100"));     // special char - reject
console.log(checkPromoCode("WRONGCODE"));    // not in list
console.log(checkPromoCode("freedel"));      // valid (case ignore)

// To run code : node promoCode.js
