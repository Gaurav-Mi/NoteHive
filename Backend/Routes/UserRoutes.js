const {validateSignUp,handleSignUp, handleLogin, validateLogin, handleFetchUser} = require("../Controller/UserController");
const express = require("express");
const fetchUser = require("../Middleware/fetchUser");
const router = express.Router();

router.route("/api/v1/signup").post(validateSignUp, handleSignUp);
router.route("/api/v1/login").post(validateLogin, handleLogin);
router.route("/api/v1/fetchuser").get(fetchUser,handleFetchUser)
module.exports = router;
