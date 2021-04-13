const express = require("express");
const router = express.Router();

// import for auth needs
const passport = require("passport");
const { doAuth } = require("../middlewares/auth/");
const authController = require("../controllers/authController");
const userValidator = require("../middlewares/validators/userValidator");

router.post("/signup", userValidator.validate, doAuth, authController.getToken);
router.post("/login", userValidator.validate, doAuth, authController.getToken);


module.exports = router;
