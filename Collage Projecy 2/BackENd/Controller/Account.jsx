const User = require("../model/User.jsx");
const md5 = require("md5");

const register = (req, res) => {
  const { Username, Email, Password, Phonenumber } = req.body;
  User.findOne({ $or: [{ Email: Email }, { Username: Username }] })
    .then((user) => {
      if (user) {
        res.status(200).json({
          regsiterStatus: false,
          message: "Email or Username already exits",
        });
      } else {
        const newUser = new User({
          Username: Username,
          Email: Email,
          Password: md5(Password),
          Phonenumber: Phonenumber,
        });
        newUser.save().then(() => {
          res.json({
            regsiterStatus: true,
            message: "Acoount created sucessfully",
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error });
      console.log(error);
    });
};

const login = (req, res) => {
  const { Email, Password } = req.body;

  User.findOne({ Email: Email, Password: md5(Password) }).then((user) => {
    if (user) {
      res.status(200).json({
        loginStatus: true,
        message: "Logged in Sucessfully",
      });
    } else {
      res.status(200).json({
        loginStatus: false,
        message: "Logged in failed",
      });
    }
  });
};

const LoadInfo = (req, res) => {
  const { Username } = req.body;
  User.findOne({ Username: Username }).then((user) => {
    if (user) {
      res.status(200).json({
        Username: user.Username,
        Email: user.Email,
        Points: user.Points,
        Phonenumber: user.Phonenumber,
      });
    } else {
      res.status(200).json({
        loadStatus: false,
        message: "failed",
      });
    }
  });
};

module.exports = { LoadInfo, register, login };
