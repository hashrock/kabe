const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = 3000;
var multer = require("multer");
var path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

var upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), function (req, res, next) {
  res.json({
    file: req.file.filename,
  });
});

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
