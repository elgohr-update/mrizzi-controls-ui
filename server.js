const express = require("express");
const path = require("path");
const app = express(), bodyParser = require("body-parser");

const setupProxy = require('./src/setupProxy');

port = 3000;

setupProxy(app);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
