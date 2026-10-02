// Tasks
// 1.   Create a simple Express server in a file called app.js and use the built-in express.json() middleware to parse incoming JSON request bodies. Log the parsed body to the console whenever a POST request is made to /feedback.
// 2.   Implement a custom middleware function called requestTime in your Express app that adds a timestamp property (requestTime) to each incoming request object. Send this timestamp back in the response for any GET request to /time-check.
// 3.   Build a logger middleware named instaLogger that logs the HTTP method, URL, and response status code for each request, similar to how Instagram might track API usage. Mount it globally in your Express app and test it with at least two different routes.
// 4.   Use the body-parser npm package to handle URL-encoded form data in your Express app. Create a POST /playlist route that accepts a song name and artist from a form (like adding a song to a Spotify playlist) and responds with a confirmation message including the song details.
// 5.   Refactor your instaLogger middleware to skip logging for requests to the /health route (simulate a health check endpoint like real apps use).


const express = require('express')

const bodyParser = require('body-parser')

const app = express()

const PORT = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

function requestTime(req,res,next) {
    req.requestTime = new Date().toISOString();
    next();
}

function instaLogger(req,res,next) {
    if (req.path === '/health') {
        return next();
    }

    res.on('finish', () => {
        console.log(`${req.method} ${req.originalUrl} - ${res.statusCode}`);
    })
    next();
}

app.use(requestTime);
app.use(instaLogger);

app.post('/feedback', (req,res) => {
    console.log(req.body);
    res.send('Feedback received!');
})

app.get('/time-check', (req,res) => {
    res.send(`Request received at: ${req.requestTime}`);
})

app.post('/playlist', (req,res) => {
    const { songName, artist } = req.body;
    res.send(`Song "${songName}" by ${artist} added to your playlist!`);
})

app.get('/health', (req,res) => {
    res.send('Server is healthy!');
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})