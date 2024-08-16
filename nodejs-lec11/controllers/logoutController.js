const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (users) {
    this.users = users;
  },
};
const fsPromises = require("fs").promises;
const { fr } = require("date-fns/locale");
const path = require("path");

const handleLogout = async (req, res) => {
  // on client, delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204); // 204 No Content to send back
  }
  const refreshToken = cookies.jwt;

  // check if the refreshToken exists in database
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // secure: true in production- only serves over https; not set here for development
    return res.sendStatus(204); // 204 No Content to send back
  }
  // Delete refreshToken from the database
  const otherUsers = usersDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );
  const currentUser = {
    ...foundUser,
    refreshToken: "",
  };
  usersDB.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "../model/users.json"),
    JSON.stringify(usersDB.users)
  );
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // secure: true in production- only serves over https; not set here for development
  res.sendStatus(204); // 204 No Content to send back
};

module.exports = { handleLogout };
