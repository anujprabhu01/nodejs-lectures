const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

// if you put this custom middleware at the very top, it will run on every request
//custom middleware logger
app.use(logger); // isnt logger a function? how does this work?

// built-in middleware to handle cors; CORS stands for Cross-Origin Resource Sharing
const whiteList = [
  "https://www.yoursite.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
]; //CORS whitelist (domains that are allowed to access this nodejs backend server)
// after developing, you can remove the localhost domains
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      //after deploying, you can remove !origin
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuceessStatus: 200,
};
app.use(cors(corsOptions));

// built-in middleware to handle url-encoded data
// in other words, form data
// 'content-type': 'application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built in middleware for json
app.use(express.json());

//serve static files like css, images, etc
app.use("/", express.static(path.join(__dirname, "/public"))); //default is "/" anyways
app.use("/subdir", express.static(path.join(__dirname, "/public")));

app.use("/subdir", require("./routes/subdir"));

app.get("^/$|index(.html)?", (req, res) => {
  // res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page.html", (req, res) => {
  res.redirect(301, "/new-page.html"); // 302 by default
});

// Route handlers (are middleware functions)
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attempted to load hello.html");
    next();
  },
  (req, res) => {
    res.send("Hello from the server!");
  }
);

// chaining route handlers
const one = (req, res, next) => {
  console.log("one");
  next();
};

const two = (req, res, next) => {
  console.log("two");
  next();
};

const three = (req, res) => {
  console.log("three");
  res.send("Finished!");
};

app.get("/chain(.html)?", [one, two, three]);

// app.all() is also a route handler
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
}); // this should be the last route (i think)

// app,use() does not accept regex
// app.use() is used to load middleware functions
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 3 types of midleware: built-in, third-party, custom
