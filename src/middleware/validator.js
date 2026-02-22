const { body, validationResult } = require("express-validator");

exports.registerValidation = [
  // name validation
  body("name").trim().notEmpty().withMessage("name required"),
  //email validation
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email required")
    .isEmail()
    .withMessage("invalid email format")
    .normalizeEmail(),
  //password validation
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),

  body("confirmPassword")
    .notEmpty()
    .withMessage("confirm password required")
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Passwords do not match");
      return true;
    }),
];

exports.loginValidation = [
  // email validation
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .normalizeEmail(),

  body("password").trim().notEmpty().withMessage("password is required"),
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(
      "error found:",
      errors.mapped((err) => err.msg),
    );
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => err.msg),
    });
  }
  next();
};
