const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

const wordCounter = [{ word: "cat", count: 2 }];

app.get("/sanity", function (req, res) {
  res.send("Server is up and running");
});

app.get("/sanity/:word", function (req, res) {
  const word = req.params.word;
  const found = wordCounter.find((w) => w.word === word);
  if (found) {
    res.send({ count: found.count });
  } else {
    res.send({ count: 0 });
  }
});

const port = 3000;
app.listen(port, function () {
  console.log(`Server running on ${port}`);
});
