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
