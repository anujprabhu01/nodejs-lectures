const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const PORT = process.env.PORT || 3500;

// if you put this custom middleware at the very top, it will run on every request
//custom middleware logger
app.use(logger); // isnt logger a function? how does this work?

// Handle options credentials check- before CORS!!!
// and fetch cookies credentials requirement
app.use(credentials);

app.use(cors(corsOptions));

// built-in middleware to handle url-encoded data
// in other words, form data
// 'content-type': 'application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built in middleware for json
app.use(express.json());

// middleware to parse cookies
app.use(cookieParser());

//serve static files like css, images, etc
app.use("/", express.static(path.join(__dirname, "/public"))); //default is "/" anyways

// routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth")); // cmd + d to select multiple instances of the same word
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT); // this is a custom middleware; everything after this will use verifyJWT middleware

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
