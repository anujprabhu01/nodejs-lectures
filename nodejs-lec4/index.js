const logEvents = require("./logEvents");

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

// initialize the event emitter
const myEmitter = new MyEmitter();

// add listener to the event emitter
myEmitter.on("log", (msg) => {
  logEvents(msg);
});

setTimeout(() => {
  // Emit event
  myEmitter.emit("log", "Log event emitted");
}, 2000);
