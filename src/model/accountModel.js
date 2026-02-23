const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: ["active", "frozen", "Closed"],
        message: "status can be either active, frozen or closed",
      },
    },
    currency: {
      type: String,
      required: [true, " currency is required for creating an account"],
      default: "INR",
    },
  },
  {
    timestamps: true,
  },
);

accountSchema.index({
  user: 1,
  status: 1,
});

const accountModel = mongoose.model("account", accountSchema);
module.exports = accountModel;
