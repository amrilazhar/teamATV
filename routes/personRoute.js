const express = require("express");
const router = express.Router();

// import for auth needs
const passport = require("passport");
const { doAuth, isAdmin, isUser } = require("../middlewares/auth/");

//Import Controller Here

//Import Midddlewares Here

//Create your Router Here


module.exports = router;
