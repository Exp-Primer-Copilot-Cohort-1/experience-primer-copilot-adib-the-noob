// create a web server that can respond to requests for /comment.json with a random comment from the comments array that you defined in the previous exercise.
// If the request’s query string has a parameter named count with a numeric value, then respond with an array of that number of random comments instead. For example, a request for /comment.json?count=2 should respond with a 200 OK status code and an array of two random comments.

var http = require('http');
var url = require('url');

var comments = [
  "This is a comment",
  "This is another comment",
  "This is yet another comment"
];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

var server = http.createServer(function(request, response) {
  var parsedUrl = url.parse(request.url, true);
  if (parsedUrl.pathname === '/comment.json') {
    if (parsedUrl.query.count) {
      var data = [];
      for (var i = 0; i < parsedUrl.query.count; i++) {
        data.push(getRandomElement(comments));
      }
      response.writeHead(200, {'Content-Type': 'application/json',
                               'Access-Control-Allow-Origin': '*'});
      response.write(JSON.stringify(data));
      response.end();
    } else {
      response.writeHead(200, {'Content-Type': 'application/json',
                               'Access-Control-Allow-Origin': '*'});
      response.write(JSON.stringify(getRandomElement(comments)));
      response.end();
    }
  } else {
    response.writeHead(404);
    response.end();
  }
});

server.listen(8080);
