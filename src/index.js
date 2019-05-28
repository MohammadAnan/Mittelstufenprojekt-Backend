var sqlite3 = require("sqlite3").verbose();

const express = require("express");
const app = express();
const port = 8080;

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/create/:entityName", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  var db = new sqlite3.Database("database.db");
  db.serialize(function() {
    // req.body.sql contains the SQL query from the frontend
    let q =
      "INSERT INTO " +
      req.params.entityName +
      " VALUES (" +
      req.body.values +
      ")";
    console.log(q);
    db.run(q, function(err) {
      if (err != null) {
        console.error(err.stack);
        res.status(500).send("Something broke!");
        res.end();
        return;
      }
      res.end();
    });
  });

  db.close();
});

app.get("/read/:entityName", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  var db = new sqlite3.Database("database.db");
  db.serialize(function() {
    // req.body.sql contains the SQL query from the frontend
    let q = "SELECT * FROM " + req.params.entityName;
    console.log(q);
    db.all(q, function(err, rows) {
      if (err != null) {
        console.error(err.stack);
        res.status(500).send("Something broke!");
        res.end();
        return;
      }
      res.write(JSON.stringify(rows));
      res.end();
    });
  });

  db.close();
});

app.post("/update/:entityName/:entityId", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  var db = new sqlite3.Database("database.db");
  db.serialize(function() {
    // req.body.sql contains the SQL query from the frontend
    let q =
      "UPDATE " +
      req.params.entityName +
      " SET " +
      req.body.key +
      "='" +
      req.body.value +
      "' WHERE " +
      req.params.entityName +
      "ID = " +
      req.params.entityId;
    console.log(q);
    db.run(q, function(err) {
      if (err != null) {
        console.error(err.stack);
        res.status(500).send("Something broke!");
        res.end();
        return;
      }
      res.end();
    });
  });

  db.close();
});

app.get("/delete/:entityName/:entityId", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  var db = new sqlite3.Database("database.db");
  db.serialize(function() {
    // req.body.sql contains the SQL query from the frontend
    let q =
      "DELETE FROM " +
      req.params.entityName +
      " WHERE " +
      req.params.entityName +
      "ID=" +
      req.params.entityId;
    console.log(q);
    db.run(q, function(err) {
      if (err != null) {
        console.error(err.stack);
        res.status(500).send("Something broke!");
        res.end();
        return;
      }
      res.end();
    });
  });

  db.close();
});

// we need two routes (/run and /all), because some queries return results (SELECT) and others don't (CREATE, UPDATE, INSERT)

// run an SQL query that doesn't return a result set (CREATE, UPDATE, INSERT)

app.post("/run", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  var db = new sqlite3.Database("database.db");
  db.serialize(function() {
    // req.body.sql contains the SQL query from the frontend
    db.run(req.body.sql, function(err) {
      if (err != null) {
        console.error(err.stack);
        res.status(500).send("Something broke!");
        res.end();
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
        console.error(err.stack);
        res.status(500).send("Something broke!");
        res.end();
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

/*

CREATE

curl --data values="1337, 'Gitarreunterricht'" https://msqd2.sse.codesandbox.io/create/kurs

READ

curl https://msqd2.sse.codesandbox.io/read/kurs

UPDATE

curl --data "key=Name&value=Keyboardunterricht" https://msqd2.sse.codesandbox.io/update/kurs/1337

DELETE

curl https://msqd2.sse.codesandbox.io/delete/kurs/1337

*/
