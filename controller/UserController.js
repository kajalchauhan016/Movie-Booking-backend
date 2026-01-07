const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const generateToken = require("../helper/token");

exports.signup = async (req, res) => {
  try {
    const { Firstname, Lastname, email, password } = req.body;
    if (!Firstname || !Lastname || !email || !password) {
      return res.json({ mssg: "All fields are required" });
    }
    const hash = await bcrypt.hash(password, 10);

    const addUser = await User.create({
      Firstname,
      Lastname,
      email,
      password: hash,
    });
    if (addUser) {
      return res.status(200).json({
        mssg: "user Created",
        data: addUser,
        token: generateToken(addUser._id),
      });
    } else {
      return res.status(400).json({ mssg: "Internal server error" });
    }
  } catch (error) {
    res.status(500).json({ mssg: error });
    console.error(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ mssg: "All fields are required" });
    }
    const userfind = await User.findOne({ email });
    if (userfind) {
      const hashPassword =await bcrypt.compare(password,userfind.password);
      if (hashPassword) {
        return res.status(200).json({
          mssg: "user Login",
          token: generateToken(userfind._id),
        });
      } else {
        return res.status(404).json({ mssg: "password not matched" });
      }
    } else {
      return res.status(400).json({ mssg: "Internal server error" });
    }
  } catch (error) {
    res.status(500).json({ mssg: error });
    console.error(error);
  }
};
