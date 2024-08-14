// when you clone someone else's repo from github, you can run npm install to install all the dependencies. npm install will read the package.json file and install all the dependencies listed in the file. then you can run the app by typing node {index.js} in the terminal.

// when you do not put -D flag, the package will be installed as a dependency. if you put -D flag, the package will be installed as a dev dependency. dev dependency is only used during development, not in production.

// npm modules
const { format } = require("date-fns");
const { v4: uuid } = require("uuid"); // read as "as uuid"

// node common core modules
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);
  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    //testing
    await fsPromises.appendFile(path.join(__dirname, "logs", logName), logItem);
  } catch (err) {
    console.log(err);
  }
};

module.exports = logEvents;
