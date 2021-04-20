const jwt = require("jsonwebtoken");
const { user, review, movie, person } = require("../models");

class ReviewController{
    async create(req, res) {
        try {
            req.body.user_id = req.user.id;
            const singleMovie = await movie.findById(req.body.movie_id);
            
            if(!singleMovie){
            return res.status(404).json({
                message: `id Movie Not Found ${req.body.movie_Id}`,
              });
            }
            
            // Create data
          let data = await review.create(req.body);

          return res.status(201).json({
            message: "Success",
            data,
          });

        } catch (e) {

            console.log(e);
          return res.status(500).json({
            message: "Internal Server Error",
            error: e.message,
          });
        }
      }
    
      async update(req, res) {
        try {
            req.body.user_id = req.user.id;
            const singleReview = await review.findById(req.params.id);
            
            if(!singleReview){
            return res.status(404).json({
                message: `no review visit ${req.params.id}`,
              });
            }
            if(!singleReview.user_id.toString() !== req.user.id && req.user.id){
                return res.status(404).json({
                    message: `not autorisation`,
                  });
                }    
          // Update data
          let data = await review.findOneAndUpdate(
            {
              _id: req.params.id,
            },
            req.body, // This is all of req.body
            {
              new: true,
            }
          );
          // new is to return the updated transaksi data
          // If no new, it will return the old data before updated
    
          // If success
          return res.status(201).json({
            message: "Success",
            data,
          });
        } catch (e) {
          return res.status(500).json({
            message: "Internal Server Error",
            error: e.message,
          });
        }
      }
    
      async delete(req, res) {
        try {
            req.body.user_id = req.user.id;
            const singleReview = await review.findById(req.params.id);
            
            if(!singleReview){
            return res.status(404).json({
                message: `no review visit ${req.params.id}`,
              });
            }
            if(!singleReview.user_id.toString() !== req.user.id && req.user.id){
                return res.status(404).json({
                    message: `not autorisation`,
                  });
                }    
          // delete data depends on req.params.id
          let data = await review.remove();
    
          // If success
          return res.status(200).json({
            message: "Success to delete transaksi",
          });
        } catch (e) {
          // If failed
          return res.status(500).json({
            message: "Internal Server Error",
            error: e.message,
          });
        }
      }
    }

    module.exports = new ReviewController();
