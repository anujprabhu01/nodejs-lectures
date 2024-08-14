//file system common core module for node.js (allows CRUD operations with files)
const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"), //__dirname is a global variable that returns the path to the current directory
      "utf8"
    ); // dont need callback because we are catching errors with try/catch
    console.log(data);
    await fsPromises.unlink(path.join(__dirname, "files", "starter.txt"));
    await fsPromises.writeFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      "\n\nNice to meet you."
    );
    await fsPromises.rename(
      path.join(__dirname, "files", "promiseWrite.txt"),
      path.join(__dirname, "files", "promiseComplete.txt")
    );

    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", "promiseComplete.txt"),
      "utf8"
    );
    console.log(newData);
  } catch (err) {
    console.error(err);
  }
};

fileOps();

// console.log("Hello..."); // in asychronus code (where code is not executed in order but in the order of which the request in processed and completed), this will be logged before readFile is done because logging a string is faster than reading a file

/* fs.writeFile(
  path.join(__dirname, "files", "reply.txt"),
  "Nice to meet you.", // don't have to specify utf8 now, that is by default
  (err) => {
    if (err) throw err;
    console.log("Write complete.");

    fs.appendFile(
      path.join(__dirname, "files", "reply.txt"),
      "\n\nYes it is.", // don't have to specify utf8 now, that is by default
      (err) => {
        if (err) throw err;
        console.log("Append complete.");

        fs.rename(
          path.join(__dirname, "files", "reply.txt"),
          path.join(__dirname, "files", "newReply.txt"),
          (err) => {
            if (err) throw err;
            console.log("Rename complete.");
          }
        );
      }
    );
  }
); */

// if you want asynchronous operations to happen in a certain order such as writing to a file, then appending to that file, and then renaming that file, then you have to write every subsequent operation's code in the previous operation's callback code.

// appendFile will append contents to an existing file but will also create a new file and append text to it if needed. Appending happens at the end of a file.

// exit on uncaught errors
process.on("uncaughtException", (err) => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1);
});

// callback should be last parameter in the function
// fs.readFile(path, 'utf8', callback)
//dont have to import process module

// append file will create a new file if it doesn't exist
