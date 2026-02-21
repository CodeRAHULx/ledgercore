const { body, validationResult } = require("express-validator");

exports.registerValidation = [
  // name validation
  body("name").notEmpty().withMessage("name required"),
  //email validation
  body("email")
    .notEmpty()
    .withMessage("email required")
    .isEmail()
    .withMessage("invalid email format"),
  //password validation
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(
      "error found:",
      errors.array().map((err) => err.message),
    );
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => err.msg),
    });
  }
  next();
};
