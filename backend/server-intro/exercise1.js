const http = require("http");

const server = http.createServer(function (req, response) {
  if (req.method === "GET") {
    if (req.url === "/") {
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.write("Welcome to my server!");
    } else if (req.url === "/about") {
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.write("This is the about page");
    } else if (req.url === "/contact") {
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.write("Contact: Samer");
    } else {
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.write("404 - Page Not Found");
    }
  }

  response.end();
});

const port = 3000;
server.listen(port, function () {
  console.log(`Node server created at port ${port}`);
});
