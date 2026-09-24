/* Task 3
Build an async function getOrderStatus(orderId) that uses setTimeout to 
simulate a delayed response. If orderId is missing, reject the promise 
with an Error. Handle the error using try/catch with async/await.

Hint: Remember to use 'await' and catch errors in the async function. */

function getOrderStatus(orderId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // if orderId is missing / empty
            if (!orderId) {
                reject(new Error("Order ID is missing"));
            } else {
                resolve({
                    orderId: orderId,
                    status: "Delivered",
                    item: "iPhone case"
                });
            }
        }, 1000);
    });
}

// using async/await with try/catch
async function checkOrder() {
    // valid order
    try {
        let order = await getOrderStatus("ORD123");
        console.log("Order details:", order);
    } catch (err) {
        console.log("Error:", err.message);
    }

    // missing orderId (error case)
    try {
        let order2 = await getOrderStatus(null);
        console.log("Order details:", order2);
    } catch (err) {
        console.log("Error:", err.message);
    }
}

checkOrder();

// To run code : node getOrderStatus.js
