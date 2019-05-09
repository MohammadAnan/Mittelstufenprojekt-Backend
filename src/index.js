var http = require("http");

//create a server object:
http
  .createServer(function(req, res) {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://mmwny6l98y.codesandbox.io"
    );
    res.write("Hello World"); //write a response to the client
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080
