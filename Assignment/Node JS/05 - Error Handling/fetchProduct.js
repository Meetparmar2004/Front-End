/* Task 5
Refactor an existing function that fetches product details from a fake 
Flipkart API so that it handles both synchronous and asynchronous errors 
gracefully, always returning a user-friendly error message instead of 
crashing the app. */

// fake flipkart products
let products = [
    { id: 1, name: "iPhone 14", price: 69999 },
    { id: 2, name: "Nike Shoes", price: 4999 },
    { id: 3, name: "Boat Headphones", price: 1499 }
];

// old buggy version (can crash):
// function fetchProduct(id) {
//     let product = products.find(p => p.id === id);
//     return product.name;  // crashes if product is undefined
// }

// refactored - handles sync + async errors
function fetchProductDetails(productId) {
    return new Promise((resolve, reject) => {
        try {
            // sync error - invalid id type
            if (typeof productId !== "number") {
                throw new Error("Product ID must be a number");
            }

            // simulate api delay
            setTimeout(() => {
                let product = products.find((p) => p.id === productId);

                if (!product) {
                    // async error - product not found
                    reject(new Error("Product not found on Flipkart"));
                } else {
                    resolve(product);
                }
            }, 1000);
        } catch (err) {
            // catch sync errors and reject with friendly msg
            reject(new Error(err.message));
        }
    });
}

async function showProduct(id) {
    try {
        let product = await fetchProductDetails(id);
        console.log("Product:", product.name, "- Rs.", product.price);
    } catch (err) {
        // always show friendly message, app wont crash
        console.log("Oops! Something went wrong:", err.message);
    }
}

// test valid product
showProduct(1);

// test not found (async error)
setTimeout(() => {
    showProduct(99);
}, 1500);

// test invalid type (sync error)
setTimeout(() => {
    showProduct("abc");
}, 3000);

// To run code : node fetchProduct.js
