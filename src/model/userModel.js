const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "email is required"],
    },
    email: {
      type: String,
      required: [true, "email is required to create a user"],
      trim: true,
      lowercase: true,
      unique: [true, "user already exist with this email"],
      // match: [
      //   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/,
      //   "invalid email address",
      // ],
    },

    password: {
      type: String,
      required: [true, "password is required for creating an account"],
      minlength: [6, "password should contain more 6 character"],
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  try {
    if (!this.isModified("password")) {
      return;
    }

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  } catch (err) {
    console.log("error at db bcrypt", err.message);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
