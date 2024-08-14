// when you clone someone else's repo from github, you can run npm install to install all the dependencies. npm install will read the package.json file and install all the dependencies listed in the file. then you can run the app by typing node {index.js} in the terminal.

// when you do not put -D flag, the package will be installed as a dependency. if you put -D flag, the package will be installed as a dev dependency. dev dependency is only used during development, not in production.

const { format } = require("date-fns");
const { v4: uuid } = require("uuid"); // read as "as uuid"

//console.log("testing!");

console.log(format(new Date(), "yyyyMMdd\tHH:mm:ss"));
console.log("hello");

console.log(uuid());

console.log();
