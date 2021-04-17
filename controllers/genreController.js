const jwt = require("jsonwebtoken");
const { genre } = require("../models");

class GenreController {
  async getAll(req,res) {
    try {
      //get data genre
      let dataGenres = await genre.find({ deleted: false }).exec();

      //cek if data exist
      if (dataGenres.length == 0) {
        res.status(400).json({ message: "No Data Found", data : null });
      } else res.status(200).json({ message: "success", data: dataGenres });

    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "internal server error" });
    }
  }

  async getMain(req,res){
    try {
      //get data genre
      let dataGenres = await genre.find({ deleted: false, isMain: true }).exec();

      //cek if data exist
      if (dataGenres.length == 0) {
        res.status(400).json({ message: "No Data Found", data : null});
      } else res.status(200).json({ message: "success", data: dataGenres });

    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "internal server error" });
    }
  }

  async create(req,res){
    try {

      let data = {
        genre : req.body.genre,
        isMain : req.body.main == "true" ? true : false,
        updatedBy : req.user.id,
      }
      let createGen = await genre.create(data);

      if (!createGen) {
        res.status(400).json({ message: "Insert Failed", error : createGen});
      } else res.status(200).json({ message: "success", data : createGen});

    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "internal server error" });
    }
  }

  async update(req,res){
    try {

      let data = {
        genre : req.body.genre,
        isMain : req.body.main.toLowerCase() == "true" ? true : false,
        updatedBy : req.user.id,
      }

      let updateGen = await genre.findOneAndUpdate({_id : req.params.id}, data , {new:true});

      if (!updateGen) {
        res.status(400).json({ message: "Insert Failed", error : updateGen});
      } else res.status(200).json({ message: "success", data : updateGen});

    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "internal server error" });
    }
  }

  async delete(req,res){
    try {

      let deleteGen = await genre.deleteOne({ _id: req.params.id });

      if (!deleteGen.deletedCount) {
        res.status(400).json({ message: "Delete Failed", error: deleteGen });
      } else res.status(200).json({ message: "success", deletedCount : deleteGen.deletedCount });

    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "internal server error" });
    }
  }

}

module.exports = new GenreController();
