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

module.exports = corsOptions;