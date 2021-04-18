const express = require("express");
const router = express.Router();

// import for auth needs
const passport = require("passport");
const { doAuth, isAdmin, isUser, isUserOrGlobal } = require("../middlewares/auth/");

//Import Controller Here
const userController = require("../controllers/userController");

//Import Midddlewares Here
const userValidator = require("../middlewares/validators/userValidator")

//Create your Router Here
router.get("/userProfile/:id", isUser, userController.userProfile);
router.get("/myUserProfile", isUser, userController.myUserProfile);
router.put("/userUpdate", isUser, userValidator.validate, userController.userUpdate);
router.get("/userGetReview", isUser, userController.userGetReview);

module.exports = router;
