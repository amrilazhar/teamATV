const jwt = require("jsonwebtoken");
const { user, review, movie, person } = require("../models");

class UserController {
    async detail(req, res){
        try {
        res.json(req.user)
        } catch (e) {
        console.log(e);
        res.status(500).json({message : "Internal server error"})
        }
    }
}

module.exports = new UserController();
