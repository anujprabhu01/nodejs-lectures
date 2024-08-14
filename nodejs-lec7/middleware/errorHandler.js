const { logEvents } = require("./logEvents");

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.msg}`, "errorLog.txt");
  console.error(err.stack);
  res.status(500).send(err.msg);
};

module.exports = errorHandler;
