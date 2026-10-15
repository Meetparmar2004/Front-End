/* Task 2
Refactor a Zomato-style food order function that uses nested callbacks 
(callback hell) to instead use Promises for each step: selectRestaurant, 
selectFood, and placeOrder. Each should resolve after 1 second. */

// ---- before (callback hell) - just for understanding ----
// selectRestaurant("McDonalds", (restaurant) => {
//     selectFood(restaurant, "Burger", (food) => {
//         placeOrder(food, (order) => {
//             console.log(order);
//         });
//     });
// });

// ---- after using Promises ----

function selectRestaurant(restaurantName) {
    return new Promise((resolve) => {
        console.log("Selecting restaurant...");
        setTimeout(() => {
            console.log("Restaurant selected:", restaurantName);
            resolve(restaurantName);
        }, 1000);
    });
}

function selectFood(restaurant, foodItem) {
    return new Promise((resolve) => {
        console.log("Selecting food...");
        setTimeout(() => {
            console.log("Food selected:", foodItem, "from", restaurant);
            resolve({ restaurant, foodItem });
        }, 1000);
    });
}

function placeOrder(orderDetails) {
    return new Promise((resolve) => {
        console.log("Placing order...");
        setTimeout(() => {
            let order = "Order placed! " + orderDetails.foodItem + " from " + orderDetails.restaurant;
            resolve(order);
        }, 1000);
    });
}

// calling with promise chain
selectRestaurant("McDonalds")
    .then((restaurant) => {
        return selectFood(restaurant, "McAloo Tikki Burger");
    })
    .then((orderDetails) => {
        return placeOrder(orderDetails);
    })
    .then((finalOrder) => {
        console.log(finalOrder);
    })
    .catch((err) => {
        console.log("Something went wrong:", err);
    });

// To run code : node foodOrder.js
