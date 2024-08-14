//How NodeJS differs from Vanilla JS
// 1) Node runs on a server - not in a browser (backend not frontend)
// 2) the console is the terminal window
//console.log('Hello World');
// 3) global object instead of window object (window object is browser; window.innerheight() etc.)
//console.log(global);
// 4) has Common Core modules that we will explore (modules relating to os, file system, etc.)
// 5) CommonJS modules instead of ES6 modules
// 6) CommonJS imports need a 'require' statement
// 7) Missing some JS APIs like fetch but we can always pull in packages into node (like from npm)

const os = require("os");
//const { type } = require("os");
const path = require("path");
const { add, sub, mul, div } = require("./math"); // destruct and import

console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());

// console.log(__dirname);
// console.log(__filename);

// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));

// console.log(path.parse(__filename));

console.log(add(2, 3));
console.log(sub(2, 3));
console.log(mul(2, 3));
console.log(div(2, 3));
