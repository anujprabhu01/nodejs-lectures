const allowedOrigins = [
  "https://www.yoursite.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
]; //CORS whitelist (domains that are allowed to access this nodejs backend server)
// after developing, you can remove the localhost domains

module.exports = allowedOrigins; //export the allowedOrigins array
