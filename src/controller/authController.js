const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

/* 
 * - /api/v1/auth/register
 * - user register controller

*/

exports.registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const checkUser = await userModel.findOne({ email });

    // user already exist with this email
    if (checkUser) {
      return res.status(422).json({
        message: " user already exist",
        success: false,
      });
    }
    // if doesn't exist then register the user
    if (!checkUser) {
      const user = await userModel.create({
        name,
        email,
        password,
      });
    }

    const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET, {
      expiresIN: "3d",
    });

    //    response to the user
    res
      .cookies(token)
      .status(201)
      .json({
        user: { id: user._id, email: user.email },
        success: true,
        message: "Register successfully",
      });
  } catch (err) {
    console.log("error in register function:", err.message);
  }

  /* 
 * - /api/v1/auth/login
 * - user login controller

*/
};
