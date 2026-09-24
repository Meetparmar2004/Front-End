/* Task 5
Use ChatGPT or Copilot to generate a Node.js function that fetches cricket 
match scores from a mock API using Promises, then review and run the code 
to check if it handles errors properly.

Hint: Paste your prompt and the AI's response in your submission. */


// ========== MY PROMPT ==========
// Write a Node.js function that fetches cricket match scores from a mock API 
// using Promises. It should handle errors properly if the match is not found.


// ========== AI RESPONSE (I reviewed and fixed a bit) ==========

// mock cricket scores data (like fake API)
let matchScores = [
    { matchId: 1, teams: "India vs Australia", score: "India 287/4", status: "Live" },
    { matchId: 2, teams: "England vs Pakistan", score: "England 320/8", status: "Completed" },
    { matchId: 3, teams: "CSK vs MI", score: "CSK 175/6", status: "Live" }
];

// function that returns a Promise (mock API)
function fetchMatchScore(matchId) {
    return new Promise((resolve, reject) => {
        console.log("Fetching score for match " + matchId + "...");

        setTimeout(() => {
            let match = matchScores.find((m) => m.matchId === matchId);

            if (match) {
                resolve(match);
            } else {
                reject("Error: Match with id " + matchId + " not found");
            }
        }, 1500);
    });
}

// testing with valid match id
fetchMatchScore(1)
    .then((data) => {
        console.log("Match found!");
        console.log("Teams:", data.teams);
        console.log("Score:", data.score);
        console.log("Status:", data.status);
    })
    .catch((err) => {
        console.log(err);
    });

// testing with invalid match id (to check error handling)
setTimeout(() => {
    console.log("\n--- testing error case ---");
    fetchMatchScore(99)
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
}, 2000);


// ========== MY REVIEW ==========
// The AI code was mostly correct. I checked:
// 1. Promise resolve works when match is found - YES
// 2. Promise reject works when match not found - YES
// 3. .catch() handles the error properly - YES
// I just added some console.logs and a second test for error case.


// To run code : node cricketScores.js
