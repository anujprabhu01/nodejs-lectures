const fs = require("fs");

if (!fs.existsSync("./new")) {
  fs.mkdir("./new", (err) => {
    if (err) {
      throw err;
    }
    console.log("Directory created.");
  });
}

if (fs.existsSync("./new")) {
  fs.rmdir("./new", (err) => {
    if (err) {
      throw err;
    }
    console.log("Directory removed.");
  });
}

/* if (!fs.existsSync("./new")) {
  fs.mkdir("./new", (err) => {
    if (err) {
      throw err;
    }
    console.log("Directory created.");
  });
}

if (fs.existsSync("./new")) {
  fs.rmdir("./new", (err) => {
    if (err) {
      throw err;
    }
    console.log("Directory removed.");
  });
} */

/* process.on("uncaughtException", (err) => {
  // wrong way to handle above problem of already existing directory. if dir exists, it will throw an error and the process will exit. This is not what we want. We want to check if dir exists and if it does, then do nothing.
  console.error("Error is this: " + err);
  process.exit(1);
}); */
