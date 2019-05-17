var http = require("http");

var sqlite3 = require("sqlite3").verbose();
var dispatcher = require("httpdispatcher");

//create a server object:
http
  .createServer(function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    var db = new sqlite3.Database("database.db");
    db.serialize(function() {
      db.all("SELECT rowid AS id, info FROM lorem", function(err, rows) {
        res.write(JSON.stringify(rows));
        res.end();
      });
    });

    db.close();
  })
  .listen(8080); //the server object listens on port 8080
// define the port of access for your server
/*const PORT = 8080;

// We need a function which handles requests and send response
function handleRequest(request, response) {
  try {
    // log the request on console
    console.log(request.url);
    // Dispatch
    dispatcher.dispatch(request, response);
  } catch (err) {
    console.log(err);
  }
}

// Create a server
var myFirstServer = http.createServer(handleRequest);

// add some routes

//A sample GET request
dispatcher.onGet("/", function(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>Hey, this is the homepage of your server</h1>");
});

dispatcher.onGet("/welcome", function(req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Welcome homepage");
});

dispatcher.onError(function(req, res) {
  res.writeHead(404);
  res.end("Error, the URL doesn't exist");
});

// Start the server !
myFirstServer.listen(PORT, function() {
  // Callback triggered when server is successfully listening. Hurray!
  console.log("Server listening on: http://localhost:%s", PORT);
});
*/
