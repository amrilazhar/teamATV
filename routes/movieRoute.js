const express = require("express");
const router = express.Router();

// import for auth needs
const passport = require("passport");
const { doAuth, isAdmin, isUser, isUserOrGlobal } = require("../middlewares/auth/");

//Import Controller Here
const movieController = require("../controllers/movieController");
//Import Midddlewares Here
const searchValidator = require("../middlewares/validators/searchValidator");

//Create your Router Here
router.get("/getAll", isUserOrGlobal, searchValidator.getAll, movieController.getAll);
router.get("/getFeatured", movieController.getFeatured);
router.get("/search", isUserOrGlobal, searchValidator.search, movieController.search);
router.get("/detail/:id_movie", isUserOrGlobal, searchValidator.detailMovie, movieController.detail);
router.get("/getReview/:id_movie", isUserOrGlobal, searchValidator.getReview, movieController.getReview);

module.exports = router;
