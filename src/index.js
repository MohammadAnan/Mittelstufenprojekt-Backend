var http = require("http");

var sqlite3 = require("sqlite3").verbose();

var HttpDispatcher = require("httpdispatcher");
var http = require("http");
var dispatcher = new HttpDispatcher(); //add routing support

http
  .createServer(function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    dispatcher.dispatch(req, res);
  })
  .listen(8080);

dispatcher.setStatic("/resources");
dispatcher.setStaticDirname("static");

dispatcher.onGet("/", function(req, res) {
  //create a server object:
  var db = new sqlite3.Database("sqlite.db");
  db.serialize(function() {
    db.all("SELECT * FROM user", function(err, rows) {
      res.write(JSON.stringify(rows));
      res.end();
    });
  });

  db.close();
});

dispatcher.onGet("/route", function(req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  //console.log(req.url);
  res.end("Routing is working successfully !");
});

dispatcher.onError(function(req, res) {
  res.writeHead(404);
  res.end("Error, the URL doesn't exist");
});
