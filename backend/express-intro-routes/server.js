const express = require("express");
const app = express();

app.get("/", function (request, response) {
  console.log("Someone has come into the server. Brace yourselves.");
});

const port = 3000;
app.listen(port, function () {
  console.log(`Running server on port ${port}`);
});
