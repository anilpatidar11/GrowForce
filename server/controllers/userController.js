const userSchemaModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, phone, password } = req.body;

    if (!firstName || !lastName || !username || !email || !phone || !password) {
      return res.status(400).json({ status: false, message: "Fill all input" });
    }

    const userExists = await userSchemaModel.findOne({
      $or: [{ username }, { email }],
    });
    if (userExists) {
      return res
        .status(400)
        .json({ status: false, message: "User already exists" });
    }

    const newUser = new userSchemaModel({
      firstName,
      lastName,
      username,
      email,
      phone,
      password,
    });

    await newUser.save();

    return res
      .status(201)
      .json({
        status: true,
        message: "Registered successfully",
        user: newUser,
      });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ status: false, message: "Fill all input" });
    }

    const user = await userSchemaModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ status: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ status: false, message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res
      .status(200)
      .json({ status: true, message: "Login successful", user, token });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

// const secureData = async (req, res) => {
//   try {
//     return res.status(200).json({
//       status: true,
//       message: "This is protected data",
//       user: req.user,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       status: false,
//       message: "Failed to load secure data",
//     });
//   }
// };  testing ke liye use hota hai bs

module.exports = { registerUser, loginUser};
