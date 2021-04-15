const jwt = require("jsonwebtoken");
const { user, review, movie, person } = require("../models");

class MovieController {

  async detail(req, res) {
    try {
      //get movie detail info
      let detailMovie = await movie.find({ deleted: false, _id : req.params.id_movie});

      if (req.user) {
        //cek if user has reviewed the movie
        let cekReview = await review.find({ user_id : req.user.id , movie_id : req.params.id_movie });
        //set review Status
        if (cekReview.length == 0) {
          detailMovie[0]._doc.reviewStatus = false;
          detailMovie[0]._doc.reviewID = null ;
        } else {
          detailMovie[0]._doc.reviewStatus = true;
          detailMovie[0]._doc.reviewID = cekReview[0]._id ;
        }
      }

      if (!detailMovie.length == 0) {
        res.status(200).json({ message: "success", data: detailMovie });
      } else {
        res.status(400).json({ message: "No movie Found", data: detailMovie });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({message : "Internal server error"})
    }
  }

  async getReview(req, res) {
    try {
      const options = {
        page: req.query.page,
        limit: req.query.limit,
      };

      let dataReview = await review.paginate({ deleted: false, movie_id : req.params.id_movie}, options);

      if (dataReview.totalDocs > 0) {
        res.status(200).json({ message: "success", data: dataReview });
      } else {
        res.status(400).json({ message: "Not Yet Reviewed", data: dataReview });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({message : "Internal server error"})
    }
  }

  async getFeatured(req, res) {
    try {
      let dataMovie = await movie
        .find({ isFeatured: true })
        .select("title poster avg_rating")
        .sort({ release_date : 1 })
        .limit(10);

      if (!dataMovie.length == 0) {
        res.status(200).json({ message: "success", data: dataMovie });
      } else {
        res.status(400).json({ message: "Not Found" });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({message : "Internal server error"})
    }
  }

  async getAll(req, res) {
    try {
      const options = {
        page: req.query.page,
        limit: req.query.limit,
      };

      let dataMovie = await movie.paginate({ deleted: false }, options);

      if (dataMovie.totalDocs > 0) {
        res.status(200).json({ message: "success", data: dataMovie });
      } else {
        res.status(400).json({ message: "Not Found" });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({message : "Internal server error"})
    }
  }

  async search(req, res) {
    try {
      //Option for pagination
      const options = {
        page: req.query.page,
        limit: req.query.limit,
      };

      //initialize search Options
      let searchOpt = {
        deleted: false,
      };

      // add filter genre if the query params not null
      if (req.query.genre) {
        let genre = req.query.genre.split(",");
        searchOpt.genre = { $all: genre };
      }

      // add filter title if the query params not null
      if (req.query.title) {
        let stringRegex = ".*" + req.query.title + ".*";
        searchOpt.title = new RegExp(stringRegex);
      }

      // add filter status (released/upcoming) if the query params not null
      if (req.query.status) {
        searchOpt.isReleased = req.query.status == "released" ? true : false;
      }

      // add filter rated (G / R / etc) if the query params not null
      if (req.query.rated) {
        let stringRegex = ".*" + req.query.rated + ".*";
        searchOpt.rated = new RegExp(stringRegex);
      }

      // add filter release_date if the query params not null
      if (req.query.release_date) {
        let release = req.query.release_date.split(",");

        //if input end and start date
        if (release.length == 2) {
          searchOpt.release_date = {
            $gte: new Date(release[0]),
            $lte: new Date(release[1]),
          };
        }
        // if just input 1 date
        else {
          let lte = eval(release[0]) + 1;
          searchOpt.release_date = {
            $gte: new Date(release[0]),
            $lte: new Date(lte.toString()),
          };
        }
      }

      let dataMovie = await movie.paginate(searchOpt, options);

      if (dataMovie.totalDocs > 0) {
        res.status(200).json({ message: "success", data: dataMovie });
      } else {
        res.status(400).json({ message: "Not Found", data: dataMovie });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({message : "Internal server error"})
    }
  }
}

module.exports = new MovieController();
