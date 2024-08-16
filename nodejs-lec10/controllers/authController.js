const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (users) {
    this.users = users;
  },
};
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ msg: "Please include username and password" });
  }
  // check if the user exists
  const foundUser = usersDB.users.find((person) => person.username === user);
  if (!foundUser) {
    return res.status(401).json({ msg: "User not found" }); // 401 Unauthorized
  }
  //  evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (!match) {
    return res.status(401).json({ msg: "Invalid password" });
  } else {
    // if match
    // create JWTs
    res.json({ success: `User ${user} is logged in` });
  }
};

module.exports = { handleLogin };
