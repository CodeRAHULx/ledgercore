const accountModel = require("../model/accountModel");

exports.accountController = async function (req, res) {
  try {
    const user = req.user;
    const account = await accountModel.create({
      user: user._id,
    });

    res.status(201).json({
      account,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({
      message: err.message,
    });
  }
};
