const express = require("express");
const router = express.Router(); // express.Router() returns a router object
const path = require("path");

router.get("^/$|index(.html)?", (req, res) => {
  // res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"));
});
router.get("/test(.html)?", (req, res) => {
  // res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "test.html"));
});

//console.log(__dirname);

module.exports = router;
