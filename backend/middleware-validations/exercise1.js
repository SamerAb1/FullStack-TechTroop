const express = require("express");
const path = require("path");

const app = express();

const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
};

let counter = 0;
const requestCounter = (req, res, next) => {
  counter += 1;
  req.requestCount = counter;
  next();
};

app.use(requestLogger);
app.use(requestCounter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome!", requestCount: req.requestCount });
});

app.get("/about", (req, res) => {
  res.json({ message: "About", requestCount: req.requestCount });
});

const port = 3000;
server.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
