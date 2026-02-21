const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
} = require("../controller/authController");
const { registerValidation, validate } = require("../middleware/validator");
/*
 api/v1/auth/register
*/
router.post("/register", registerValidation, validate, registerController);

/*
 api/v1/auth/login
*/
// router.post("/login", loginController);

module.exports = router;
