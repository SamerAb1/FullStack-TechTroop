const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

const wordCounter = { cat: 2 };

app.get("/sanity", function (req, res) {
  res.send("Server is up and running");
});

app.get("/word/:word", function (req, res) {
  const word = req.params.word;
  const count = wordCounter[word] || 0;
  if (found) {
    res.send({ count: count });
  } else {
    res.send({ count: 0 });
  }
});

app.post("/word", function (req, res) {
  const { word } = req.body;

  const w = word.trim();
  wordCounter[w] = (wordCounter[w] || 0) + 1;
  res.send({
    text: `Added ${w}`,
    currentCount: wordCounter[w],
  });
});

app.post("/sentence", (req, res) => {
  const { sentence } = req.body;
  const words = sentence.toLowerCase().match(/[a-z0-9]+/gi);

  let numNewWords = 0;
  let numOldWords = 0;

  for (const w of words) {
    if (wordCounter[w]) {
      wordCounter[w] += 1;
      numOldWords += 1;
    } else {
      wordCounter[w] = 1;
      numNewWords += 1;
    }
  }
  res.send({
    text: `Added ${numNewWords} words, ${numOldWords} already existed`,
    currentCount: -1,
  });
});
app.delete("/word/:word", (req, res) => {
  const raw = req.params.word;
  const w = raw.trim().toLowerCase();
  if (wordCounter[w] == null) {
    // not found
    return res.status(404).send({ error: `Word '${w}' not found` });
  }
  const removedCount = wordCounter[w];
  delete wordCounter[w]; // remove the key entirely

  return res.status(200).send({ text: `Deleted '${w}'`, removedCount });
});
const port = 3000;
app.listen(port, function () {
  console.log(`Server running on ${port}`);
});
