const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

router.get("/sanity", function (req, res) {
  res.send("Server is up and running");
});

const port = 3000;
app.listen(port, function () {
  console.log(`Server running on ${port}`);
});
