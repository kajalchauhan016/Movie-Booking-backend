const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const generateToken = require("../helper/token");

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!password) {
      return res.status(400).json({ mssg: "Password is required" });
    }

    const hash = await bcrypt.hash(password, 10);

    const addUser = await User.create({
      firstName,
      lastName,
      email,
      password: hash,
    });
 
    return res.status(201).json({
      mssg: "User created",
      data: addUser,
      token: generateToken({ _id: addUser._id }),
    });
  } catch (error) {
    return res.status(500).json({ mssg: error.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ mssg: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ mssg: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ mssg: "Password not matched" });
    }

    const newData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      _id: user._id.toString(),
    };

    return res.status(200).json({
      mssg: "User logged in",
      token: generateToken(newData),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mssg: error.message || "Internal server error" });
  }
};
