const express = require("express");
const app = express();
const path = require("path");

const store = [
  { name: "table", inventory: 3, price: 800 },
  { name: "chair", inventory: 16, price: 120 },
  { name: "couch", inventory: 1, price: 1200 },
  { name: "picture frame", inventory: 31, price: 70 },
];
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "../../node_modules")));

app.get("/", function (req, res) {
  console.log("Someone has come into the server. Brace yourselves.");
  res.send("Ending the cycle, thanks for visiting");
});

app.get("/priceCheck", function (req, res) {
  res.send(store);
});
app.get("/priceCheck/:name", function (req, res) {
  const item = store.filter((i) => i.name === req.params.name);

  if (!item[0]) {
    res.send({ name: req.params.name, price: null });
  } else {
    res.send({ name: req.params.name, price: item[0].price });
  }
});

app.get("/buy/:name", function (req, res) {
  const item = store.filter((i) => i.name === req.params.name);
  if (!item[0]) {
    res.send({ name: req.params.name, inventory: null });
  } else {
    if (item[0].inventory < 1) {
      res.send({ name: req.params.name, inventory: item[0].inventory });
    } else {
      res.send({ name: req.params.name, inventory: item[0].inventory });
      item[0].inventory--;
    }
  }
});

app.get("/sale", (req, res) => {
  const { admin } = req.query;
  if (admin === "true") {
    store.forEach((item) => {
      if (item.inventory > 10) {
        item.price = item.price / 2;
      }
    });
  }
  res.send(store);
});

const port = 3000;
app.listen(port, function () {
  console.log(`Server is up and running smoothly`);
});
