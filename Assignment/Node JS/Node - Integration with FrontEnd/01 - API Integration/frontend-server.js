// Serves the HTML pages on port 3000.
// Task 3 needs the page and the API on different ports.

var http = require('http');
var fs = require('fs');
var path = require('path');

var PORT = 3000;

var types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.txt': 'text/plain'
};

var server = http.createServer(function (req, res) {
  var urlPath = req.url.split('?')[0];

  if (urlPath === '/') {
    urlPath = '/index.html';
  }

  var filePath = path.join(__dirname, urlPath);

  fs.readFile(filePath, function (err, data) {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
      return;
    }

    var ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': types[ext] || 'text/plain' });
    res.end(data);
  });
});

server.listen(PORT, function () {
  console.log('Frontend running at http://localhost:' + PORT);
});
