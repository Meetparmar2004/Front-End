/* Task 4
Given the following array of objects representing movies: 
[{id:1, name:'Jawan'}, {id:2, name:'Pathaan'}, {id:3, name:'Animal'}], 
use Array.find to write a function findMovieById(id) that returns the 
movie object with the matching id.

Hint: Test your function with id 2 and log the result. */

let movies = [
    { id: 1, name: "Jawan" },
    { id: 2, name: "Pathaan" },
    { id: 3, name: "Animal" }
];

function findMovieById(id) {
    return movies.find((movie) => movie.id === id);
}

// test with id 2
let result = findMovieById(2);
console.log("Movie found:", result);

// To run : node findMovie.js
