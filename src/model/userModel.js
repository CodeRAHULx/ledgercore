const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required to create a user"],
      trim: true,
      lowercase: true,
      unique: true,
      // match: [
      //   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/,
      //   "invalid email address",
      // ],
      validate: [validator.isEmail, "invalid email"],
    },

    password: {
      type: String,
      required: [true, "password is required for creating an account"],
      minlength: [6, "password should contain more 6 character"],
      select: false,
    },
    confirmPassword: {
      type: String,
      // required : true,
      required: function () {
        return this.isNew;
      },
      select: false,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "passwords do not match",
      },
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);
//index
// userSchema.index({ email: 1 });

userSchema.pre("save", async function () {
  try {
    this.confirmPassword = undefined;
    if (!this.isModified("password")) {
      return;
    }

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  } catch (err) {
    console.log("error at db bcrypt", err.message);
    throw err;
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
