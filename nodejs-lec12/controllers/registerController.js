const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (users) {
    this.users = users;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  // async function because we are reading from a file
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ msg: "Please include username and password" });
  }
  // check for duplicate usernames in the db
  const duplicate = usersDB.users.find((person) => person.username === user);
  if (duplicate) {
    return res.status(409).json({ msg: "Username already exists" }); // 409 Conflict
  }
  try {
    // hash (encrypt) the password
    const hashedPwd = await bcrypt.hash(pwd, 10); // 10 salt rounds
    // store the new user
    const newUser = {
      username: user,
      roles: { User: 2001 },
      password: hashedPwd,
    };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "../model/users.json"),
      JSON.stringify(usersDB.users)
    );
    console.log(usersDB.users);
    res.status(201).json(`success: New user ${user} created`);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.msg });
  }
};

module.exports = { handleNewUser };
