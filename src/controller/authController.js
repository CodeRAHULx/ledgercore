const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const emailService = require("../services/emailService");
/* 
 * - /api/v1/auth/register
 * - user register controller

*/

exports.registerController = async function (req, res) {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const checkUser = await userModel.findOne({ email });

    // user already exist with this email

    if (checkUser) {
      return res.status(409).json({
        message: " user already exist",
        success: false,
      });
    }
    // if doesn't exist then register the user

    const user = await userModel.create({
      name,
      email,
      password,
      confirmPassword,
    });

    const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    //    response to the user
    res
      .cookie("token", token)
      .status(201)
      .json({
        user: { id: user._id, email: user.email },
        success: true,
        message: "Register successfully",
      });

    await emailService.sendRegistrationEmail(user.email, user.name);
  } catch (err) {
    console.log("error in register function:", err.message);
    if (err.code === 11000) {
      return res.send("user already exist ");
    }
    return res.status(500).json({
      message: "server error",
      error: err.message,
    });
  }
};
/* 
 * - /api/v1/auth/login
 * - user login controller

*/

exports.loginController = async function (req, res) {
  try {
    const { email, password } = req.body;

    const existUser = await userModel
      .findOne({ email: email })
      .select("+password");

    if (!existUser) {
      return res.status(422).json({
        success: false,
        message: "user doesn't exist",
      });
    }

    const isvalidPassword = await existUser.comparePassword(password);
    if (!isvalidPassword) {
      return res.status(401).json({
        message: "password is invalid",
      });
    }

    const token = jwt.sign({ userid: existUser._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res
      .cookie("token", token)
      .status(201)
      .json({
        user: { id: existUser._id, email: existUser.email },
        success: true,
        message: "login successfully",
        token,
      });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
