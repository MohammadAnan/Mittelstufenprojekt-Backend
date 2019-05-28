var sqlite3 = require("sqlite3").verbose();

const express = require("express");
const app = express();
const port = 8080;

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/test-page", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(req.body.test);
}); //

// we need two routes (/run and /all), because some queries return results (SELECT) and others don't (CREATE, UPDATE, INSERT)

// run an SQL query that doesn't return a result set (CREATE, UPDATE, INSERT)

app.post("/run", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  var db = new sqlite3.Database("database.db");
  db.serialize(function() {
    // req.body.sql contains the SQL query from the frontend
    db.run(req.body.sql, function(err) {
      if (err != null) {
        res.end(); // TODO return an appropriate HTTP error code
        return;
      }
      res.end();
    });
  });

  db.close();
});

// run an SQL query that returns a result set (SELECT)

app.post("/all", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  var db = new sqlite3.Database("database.db");
  db.serialize(function() {
    // req.body.sql contains the SQL query from the frontend
    db.all(req.body.sql, function(err, rows) {
      if (err != null) {
        res.end(); // TODO return an appropriate HTTP error code
        return;
      }
      res.write(JSON.stringify(rows));
      res.end();
    });
  });

  db.close();
});

/*

Try the following in the terminal or in Postman:

rm database.db
node

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db")

db.run("CREATE TABLE Developers(Name CHAR, PRIMARY KEY(Name)")
db.all("SELECT * from Developers", (err, rows) => console.log(JSON.stringify(rows)))
db.run("INSERT INTO Developers VALUES('Samah')")
db.run("INSERT INTO Developers VALUES('Anan')")
db.run("INSERT INTO Developers VALUES('Anas')")
db.run("INSERT INTO Developers VALUES('Artur')")
db.all("SELECT * from Developers", (err, rows) => console.log(JSON.stringify(rows)))

*/

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
