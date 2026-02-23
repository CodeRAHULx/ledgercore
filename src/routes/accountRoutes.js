const express = require("express");
const router = express.Router();
const accountController = require("../controller/accountController");
const accountMiddleware = require("../middleware/accountmid");
/*
 api/v1/account/create
*/
// Fixed: route path should start with '/'; use correct references for middleware and controller
router.post(
  "/create",
  accountMiddleware.accountMiddleware,
  accountController.accountController,
);

module.exports = router;
