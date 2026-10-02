// Tasks
// 1.   Install Express using npm and create an app.js file that starts a basic Express server listening on port 3000. When you visit http://localhost:3000 in your browser, it should display 'Welcome to Express!'.
// 2.   Add a new route in your Express app that handles GET requests to /profile and responds with 'This is your profile page.'
// 3.   Create two more routes in your Express app: /trending (GET) that responds with 'Trending Now on Insta' and /cart (GET) that responds with 'Your Flipkart Cart is empty.'
// 4.   Update your Express app so that any route not defined returns a custom 404 message: 'Oops! Page not found on this app'.


const express = reuqire('express')

const app = express()

app.get('/', (req,res) => {
    res.send('Welcome to Express!')
})

app.get('/profile', (req,res) => {
    res.send('This is your profile page.')
})

app.get('/trending', (req,res) => {
    res.send('Trending now on Insta')
})

app.get('/cart', (req,res) => {
    res.send('Your Flipkart cart is empty.')
})

app.get('*', (req,res) => {
    res.status(404).send('Oops! Page not found on this app')
})

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000')
})