const allowedOrigins = require("./allowedOrigins");

// built-in middleware to handle cors; CORS stands for Cross-Origin Resource Sharing
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      //after deploying, you can remove !origin
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuceessStatus: 200,
};

module.exports = corsOptions;
