const jwt = require("jsonwebtoken");
const { user } = require("../models");

class AuthController {
  async getToken(req, res) {
    try {
      const body = {
        id: req.user._id,
        role: req.user.role,
        email: req.user.email,
      };
      const token = jwt.sign(
        {
          user: body,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
        { algorithm: "RS256" }
      );
      return res.status(200).json({
        message: "success",
        token,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal server Error",
        error: e,
      });
    }
  }

  async setAdmin(req, res) {
    try {
      let options = {};
      options.overwrite = false;
      options.new = true;
      let data = await user.findOneAndUpdate(
        { _id: req.params.id },
        {
          role: "admin",
        }, options,
      );
      if (!data) {
        return res.status(400).json({ message: "someting went wrong" });
      } else {
        return res.status(200).json({ message: "Oke" });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "someting went wrong" });
    }
  }

}

module.exports = new AuthController();
