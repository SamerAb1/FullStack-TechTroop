const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
];

const validateId = (req, _res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return next(httpError(400, "Invalid ID format"));
  }
  req.id = id;
  next();
};

const checkResourceExists = (req, _res, next) => {
  const user = users.find((u) => u.id === req.id);
  if (!user) return next(httpError(404, "User not found"));
  req.user = user;
  next();
};

app.get("/users", (_req, res) => {
  res.json(users);
});

app.get("/users/:id", validateId, checkResourceExists, (req, res) => {
  res.json(req.user);
});

app.post("/users", (req, res, next) => {
  try {
    const { name } = req.body || {};
    if (!name) return next(httpError(400, "Name is required"));
    const id = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    const user = { id, name };
    users.push(user);
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
});

app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal Server Error" });
});

const port = 3000;
server.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
