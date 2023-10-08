const User = require("../model/User");
const md5 = require("md5");
// const { generateToken } = require("../Config/jwtToken");

const register = async (req, res) => {
  const { Username, Email, Password, Phonenumber } = req.body;
  let user = await User.findOne({
    $or: [{ Email: Email }, { Username: Username }],
  })
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
          // message:"Email not verified",
        });
        newUser.save().then(() => {
          res.json({
            regsiterStatus: true,
            message: "Acoount created sucessfully",
          });
        });
        const token = newUser.generateAuthToken();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
};

const login = async (req, res) => {
  const { Email, Password } = req.body;

  let user = await User.findOne({ Email: Email, Password: md5(Password) }).then(
    (user) => {
      if (user) {
        res.status(200).json({
          loginStatus: true,
          id: user.id,
          message: "Logged in Sucessfully",
        });
      } else {
        res.status(200).json({
          loginStatus: false,
          message: "Email or password does not match",
          // token: generateToken(user?._id)
        });
      }
    }
  );
};

const LoadInfo = async (req, res) => {
  const { Username } = req.body;
  const user = await User.findOne({ Username: Username }).then((user) => {
    if (user) {
      res.status(200).json({
        Username: user.Username,
        Email: user.Email,
        Points: user.Points,
        Phonenumber: user.Phonenumber,
        Role: user.Role,
      });
    } else {
      res.status(200).json({
        loadStatus: false,
        message: "failed",
      });
    }
  });
};
// const updateUser = async(req,res)=>{
//   const { id } = req.params;
//   const {Username, Email, Phonenumber} = req.body;
//   try{
//   const updateUser  = await User.findById(id,{
//     Username: Username,
//     Email:Email,
//     Phonenumber:Phonenumber,

//   },
//   {
//     new :true,
//   })
// }
// catch(error){
//   throw new Error(error);
// };
// res.json(updateUser);
// }
module.exports = { LoadInfo, register, login };
