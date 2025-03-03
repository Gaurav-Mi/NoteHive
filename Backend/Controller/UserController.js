const usermodel = require("../Model/Users");
const { body, validationResult, header } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function handleSignUp(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, email, password } = req.body;

    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    const newUser = new usermodel({ email, name, password });
    await newUser.save();

    const data = {
      ID: newUser.id,
    };
    const authToken = jwt.sign(data, process.env.secretKey);
    res.status(201).json({ authToken });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!!!" });
  }
}

const validateSignUp = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 5 characters long"),
];

async function handleLogin(req, res) {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = await usermodel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Please use correct credentials!!!" });
    }

    const isMatchpassword = await bcrypt.compare(password, user.password);

    if (!isMatchpassword) {
      return res.status(403).json({ error: "Invalid Password" });
    }

    data = {
      ID: user.id,
    };

    const authToken = jwt.sign(data, process.env.secretKey);

    res.status(200).json({ authToken });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!!!" });
  }
}
async function handleFetchUser(req, res) {
  try {
    if (req.user) {
      const fetchUser = await usermodel.findById(req.user.ID).select("-password");
      if (!fetchUser) {
        return res.status(404).send("User not found");
      }
      return res.send(fetchUser);
    } else {
      return res.status(401).send("Unauthorized: No user information");
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
}


validateLogin = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("password is required"),
];
module.exports = {
  validateSignUp,
  handleSignUp,
  handleLogin,
  validateLogin,
  handleFetchUser,
};
