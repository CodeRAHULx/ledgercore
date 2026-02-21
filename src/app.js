const express = require("express");
const app = express();
app.use(express.json());

const authrouter = require("./routes/authRoutes");

app.use("/api/v1/auth", authrouter);

module.exports = app;
