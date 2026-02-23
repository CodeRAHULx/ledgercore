const express = require("express");
const app = express();
app.use(express.json());

const authrouter = require("./routes/authRoutes");
const accountrouter = require("./routes/accountRoutes");

app.use("/api/v1/auth", authrouter);
app.use("/api/v1/account", accountrouter); // Fixed: variable name case mismatch

module.exports = app;
