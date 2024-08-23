const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  // async function because we are reading from a file
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ msg: "Please include username and password" });
  }
  const duplicate = await User.findOne({ username: user }).exec(); // if using async/await, use exec() at the end of the query to return a promise (check mongoose docs)
  // check for duplicate usernames in the db
  if (duplicate) {
    return res.sendStatus(409);
  }
  try {
    // hash (encrypt) the password
    const hashedPwd = await bcrypt.hash(pwd, 10); // 10 salt rounds
    // create and store the new user all at once
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });

    console.log(result);
    
    res.status(201).json(`success: New user ${user} created`);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.msg });
  }
};

module.exports = { handleNewUser };
