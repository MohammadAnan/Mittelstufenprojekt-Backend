/* var http = require("http");*/

var sqlite3 = require("sqlite3").verbose();

const express = require("express");
const app = express();
const port = 8080;

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/test-page", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(JSON.stringify(req.body.test));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

/*var HttpDispatcher = require("httpdispatcher");
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
*/
