const express = require("express");
const router = express.Router(); // express.Router() returns a router object
const path = require("path");

router.get("^/$|index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;
