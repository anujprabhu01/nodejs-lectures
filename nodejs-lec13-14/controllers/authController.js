const jwt = require("jsonwebtoken");
const fsPromises = require("fs").promises;
const path = require("path");

const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (users) {
    this.users = users;
  },
};
const bcrypt = require("bcrypt");
const req = require("express/lib/request");

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

    const roles = Object.values(foundUser.roles);

    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" } // in production, use a longer expiration time like 5m or 15m
    ); // you dont want to pass in password in the payload
    const refreshToken = jwt.sign(
      //refresh token is only used to verify that you get a new access token
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" } // once refresh token expires, user has to login again
    ); // you dont want to pass in password in the payload

    //Saving refreshToken with current user
    const otherUsers = usersDB.users.filter(
      (person) => person.username !== foundUser.username
    );
    const currentUser = {
      ...foundUser,
      refreshToken,
    };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "../model/users.json"),
      JSON.stringify(usersDB.users)
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true, // comment out for refresh token to work in development but we need it in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.json({ accessToken }); // store in local storage, not in cookies
  }
};

module.exports = { handleLogin };
