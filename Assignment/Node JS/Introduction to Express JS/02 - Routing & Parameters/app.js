// Tasks
// 1.   Create a new Express JS app called foodie-routes and set up two basic routes: /home (responds with 'Welcome to Foodie!') and /about (responds with 'About Foodie App').
// 2.   Add a dynamic route to your Express app: /restaurant/:name that responds with 'You are viewing [name]' where [name] is replaced by the restaurant name from the URL.
// 3.   Implement a GET route /search that accepts a query string parameter 'q' (e.g., /search?q=pizza) and responds with 'Results for: [q]'.
// 4.   Build a route /movie/:id/details that returns a JSON object with id from params and genre from a query string (e.g., /movie/123/details?genre=action should return { "id": "123", "genre": "action" }).
// 5.   Refactor your /restaurant/:name route so that if the name is missing or empty, it responds with a 400 status and the message 'Restaurant name required'.


const express = require('express')

const app = express()

app.get('/home', (req,res) => {
    res.send('Welcome to Foodie!')
})

app.get('/about', (req,res) => {
    res.send('About Foodie App')
})

app.get('/restaurant/:name', (req,res) => {
    const name = req.params.name;

    if (!name) {
        return res.status(400).send('Restaurant name required')
    }

    res.send(`You are viewing ${name}`)
})

app.get('/search', (req,res) => {
    const query = req.query.q;

    res.send(`Result for : ${query}`)
})

app.get('/movie/:id/details', (req,res) => {
    const id = req.params.id;
    const genre = req.query.genre;

    res.json({
        id : id,
        genre : genre
    })
})

app.listen(3000, () => {
    console.log('Server running at port 3000')
})