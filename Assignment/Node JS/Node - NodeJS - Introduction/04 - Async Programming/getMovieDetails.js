/* Task 4
Build a function getMovieDetails(title) that returns a Promise and resolves 
with movie info after 1 second. Use async/await to call this function for 
three different movies in sequence and print each result. */

let movies = [
    { title: "Inception", year: 2010, rating: 8.8 },
    { title: "Interstellar", year: 2014, rating: 8.6 },
    { title: "The Dark Knight", year: 2008, rating: 9.0 },
    { title: "Avatar", year: 2009, rating: 7.8 }
];

function getMovieDetails(title) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let movie = movies.find((m) => m.title === title);

            if (movie) {
                resolve(movie);
            } else {
                reject("Movie not found: " + title);
            }
        }, 1000);
    });
}

// call for 3 movies one after another
async function showMovies() {
    try {
        let movie1 = await getMovieDetails("Inception");
        console.log("Movie 1:", movie1);

        let movie2 = await getMovieDetails("Interstellar");
        console.log("Movie 2:", movie2);

        let movie3 = await getMovieDetails("The Dark Knight");
        console.log("Movie 3:", movie3);
    } catch (err) {
        console.log("Error:", err);
    }
}

showMovies();

// To run code : node getMovieDetails.js
