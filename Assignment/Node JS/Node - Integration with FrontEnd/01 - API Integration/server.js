// Task 3
// Small API for the login form.
// It runs on port 5000 and does not send CORS headers on purpose.
// The task says to observe the error, not to fix it.

var http = require('http');

var PORT = 5000;

var server = http.createServer(function (req, res) {
  console.log(req.method + ' ' + req.url);

  if (req.url === '/login' && req.method === 'POST') {
    var body = '';

    req.on('data', function (chunk) {
      body += chunk;
    });

    req.on('end', function () {
      console.log('login body:', body);

      // no Access-Control-Allow-Origin header here
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'login received' }));
    });

    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(PORT, function () {
  console.log('Login API running at http://localhost:' + PORT);
});
