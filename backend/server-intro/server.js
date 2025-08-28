const http = require("http");
const url = require("url");

let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

const server = http.createServer(async function (req, res) {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  console.log(`${method} ${path}`);
  res.setHeader("Content-Type", "application/json");

  if (method === "GET" && path === "/") {
    res.setHeader("Content-Type", "text/plain");
    res.statusCode = 200;
    res.end("Welcome to my server!");
  } else if (method === "GET" && path === "/about") {
    res.setHeader("Content-Type", "text/plain");
    res.statusCode = 200;
    res.end("This is the about page");
  } else if (method === "GET" && path === "/contact") {
    res.setHeader("Content-Type", "text/plain");
    res.statusCode = 200;
    res.end("Contact: Samer");
  } else if (method === "GET" && path === "/api/users") {
    res.statusCode = 200;
    res.end(JSON.stringify(users));
  } else if (method === "GET" && path.startsWith("/api/users/")) {
    const id = parseInt(path.split("/")[3]);
    const user = users.find((u) => u.id === id);

    if (user) {
      res.statusCode = 200;
      res.end(JSON.stringify(user));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "User not found" }));
    }
  } else if (method === "POST" && path === "/api/users") {
    try {
      const newUser = await readBody(req);

      if (!newUser.name || !newUser.email) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "Name and email are required" }));
        return;
      }

      newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
      users.push(newUser);

      res.statusCode = 201;
      res.end(JSON.stringify(newUser));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: "Invalid JSON" }));
    }
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "404 - Page not found" }));
  }
});

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
  });
}

const port = 3000;
server.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
