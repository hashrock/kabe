const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const fs = require("fs");

app.get("/files", (req, res) => {
  const files = fs.readdirSync("./public/assets");
  res.json(files);
});

app.post("/files", (req, res) => {
  fs.writeFileSync("./public/assets/index.json", JSON.stringify(req.body));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
