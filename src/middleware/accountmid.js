const userModel = require("../model/accountModel"); // Fixed require path typo: models -> model
const jwt = require("jsonwebtoken");

const accountMiddleware = async function (req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Fixed: req.headers, and split by space for Bearer token

  if (!token) {
    return res.status(401).json({
      message: "unathourized access, token is missing",
    });
  }

  try {
    // Decoded token assignment fixed
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Fixed: assign decoded token
    const user = await userModel.findById(decoded.userid); // Fixed: use correct property name (userid)
    req.user = user;
    return next();
  } catch (err) {
    console.log(err.message);
    // Fixed: use res.status().json() correctly
    return res.status(401).json({
      message: "unauthourized access",
      error: err.message,
    });
  }
};
module.exports = {
  accountMiddleware,
};
