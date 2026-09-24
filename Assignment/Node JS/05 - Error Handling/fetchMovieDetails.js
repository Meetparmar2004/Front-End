/* Task 4
Given the following buggy code, fix it so that errors from the async 
function are properly caught and logged:

async function fetchMovieDetails() { throw new Error('Movie not found'); }
try { fetchMovieDetails(); } catch (err) { console.log(err.message); }

Hint: Why doesn't the catch block work as expected with async functions? */

// BUGGY CODE (this doesn't work):
// async function fetchMovieDetails() { throw new Error('Movie not found'); }
// try { fetchMovieDetails(); } catch (err) { console.log(err.message); }
//
// Why it fails: async functions always return a Promise.
// So the error is inside the Promise, not thrown synchronously.
// try/catch only catches sync errors, so we need await!


// FIXED CODE - use await inside async function
async function fetchMovieDetails() {
    throw new Error("Movie not found");
}

async function getMovie() {
    try {
        await fetchMovieDetails();
    } catch (err) {
        console.log(err.message);
    }
}

getMovie();

// To run code : node fetchMovieDetails.js
