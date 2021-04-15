const express = require("express");
const router = express.Router();

// import for auth needs
const passport = require("passport");
const { doAuth, isAdmin, isUser } = require("../middlewares/auth/");

//Import Controller Here
const movieController = require("../controllers/movieController");
//Import Midddlewares Here

//Create your Router Here
router.get("/getAll", isUser, movieController.getAll);
router.get("/getFeatured", isUser, movieController.getFeatured);
router.get("/search", isUser, movieController.search);
router.get("/detail/:id_movie", isUser, movieController.detail);
router.get("/getReview/:id_movie", isUser, movieController.getReview);

module.exports = router;
