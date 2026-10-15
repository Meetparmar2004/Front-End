/* Tasks

1. Create a Node.js file called helloServer.js that uses the HTTP module to start a server on port 3000 and responds with 'Welcome to NodeJS Web Server' for every request.   

2.  Modify your server to check the request URL: if the path is '/about', respond with 'About Us Page', and for any other path, respond with 'Home Page'.<br><br><em><strong>Hint:</strong> Use req.url to get the path.</em>

3.  Add logic to your server so that if the request method is POST, it responds with 'POST request received', and for GET requests, it responds as before. 

4.  Build a simple Flipkart-style product listing: if the request URL is '/products', respond with a plain text list of three product names (e.g., 'iPhone 14, Nike Shoes, Boat Headphones'). For any other URL, respond with 'Page Not Found'.
*/


const http = require('http'); 

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        res.end('POST request received\n');
    } 
    else if (req.url === '/') {
        res.end('Welcome to NodeJS Web Server\n');
    }
    else if (req.url === '/about') {
        res.end('About Us Page\n');
    }
    else if (req.url === '/products') {
        res.end('iPhone 14, Nike Shoes, Boat Headphones\n');
    }
    else {
        res.end('Page Not Found\n');
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

