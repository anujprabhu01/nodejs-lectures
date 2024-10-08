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

// routes
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/employees", require("./routes/api/employees"));

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
app.use(errorHandler); // why is error handler at the end? it is at the end because it is an error handler and it should be the last middleware function in the stack (it should be the last route handler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 3 types of midleware: built-in, third-party, custom
