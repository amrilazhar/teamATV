const jwt = require("jsonwebtoken");
const { user, review, movie, person } = require("../models");

class UserController {
  // Get User information / Profile

  async userProfile(req, res) {
    try {
      let dataUser = await user.find({ _id: req.params.id });
      if (!dataUser) {
        return res.status(404).json({ message: "Id User tidak ditemukan" });
      }
      return res.status(200).json({ message: "Berhasil", data: dataUser });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async myUserProfile(req, res) {
    try {
      let dataUser = await user.find({ _id: req.user.id });
      if (!dataUser) {
        return res.status(404).json({ message: "Id User tidak ditemukan" });
      }
      return res.status(200).json({ message: "Berhasil", data: dataUser });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Update data user
  async userUpdate(req, res) {
    try {
      // Update data
      let data = await user.findOneAndUpdate(
        { _id: req.params.id },
        req.body, // This is all of req.body
        { new: true } // new is to return the latest updated
        // If no new, it will return the old data before updated
      );
      // If success
      return res.status(201).json({ message: "Success", data });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async userGetReview(req, res) {
    try {
      const options = {
        page: req.query.page,
        limit: req.query.limit,
      };
      let dataReview = await review.paginate(
        { deleted: false, _id: req.user.id },
        options
      );

      if (dataReview.totalDocs > 0) {
        res.status(200).json({ message: "success", data: dataReview });
      } else {
        res
          .status(400)
          .json({ message: "No Movie Reviewed", data: dataReview });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new UserController();
