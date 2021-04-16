const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");
const validator = require("validator");
const { user, review, movie, person } = require("../../models");

exports.create = async (req, res, next) => {
    try {
        let errors = [];

        if (!validator.isAlpha(req.body.title)) {
            errors.push("Title should be alphabet");
        }

        if (!validator.isAlpha(req.body.director)) {
            errors.push("Director should be alphabet");
        }

        if (!validator.isNumeric(req.body.budget)) {
            errors.push("Budget should be number");
        }

        if (!validator.isDate(req.body.release_date)) {
            errors.push("Date is consist of yyyy/mm/dd");
        }

        if (!validator.isAlpha(req.body.synopsis)) {
            errors.push("Synopsis should be alphabet");
        }

        if (!validator.isAlpha(req.body.genre)) {
            errors.push("Genre should be alphabet");
        }

        if (!validator.isAlpha(req.body.trailer)) {
            errors.push("Trailer should be alphabet");
        }

        if (!validator.isAlpha(req.body.characters)) {
            errors.push("Characters should be alphabet");
        }

        if (errors.length > 0) {
            return res.status(400).json({
                message: errors.join(", "),
            });
        }

        if (req.files) {
            const file = req.files.image;

            if (!file.mimetype.startsWith("image")) {
                errors.push("File must be an image");
            }

            if (file.size > 1000000) {
                errors.push("Image must be less than 1MB");
            }

            let fileName = crypto.randomBytes(16).toString("hex");

            file.name = `${fileName}${path.parse(file.name).ext}`;

            req.body.poster = file.name;

            file.mv(`./public/images/${file.name}`, async (err) => {
                if (err) {
                    console.log(err);

                    return res.status(500).json({
                        message: "Internal Server Error",
                        error: err.message,
                    });
                }
            });
        }

        next();
    } catch (e) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: e.message,
        });
    }
};

exports.update = async (req, res, next) => {
    try {
        let errors = [];

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            errors.push(
                "id_movie is not valid and must be 24 characters & hexadecimal",
            );
        }

        if (!validator.isAlpha(req.body.title)) {
            errors.push("Title should be alphabet");
        }

        if (!validator.isAlpha(req.body.director)) {
            errors.push("Director should be alphabet");
        }

        if (!validator.isNumeric(req.body.budget)) {
            errors.push("Budget should be number");
        }

        if (!validator.isDate(req.body.release_date)) {
            errors.push("Date is consist of yyyy/mm/dd");
        }

        if (!validator.isAlpha(req.body.synopsis)) {
            errors.push("Synopsis should be alphabet");
        }

        if (!validator.isAlpha(req.body.genre)) {
            errors.push("Genre should be alphabet");
        }

        if (!validator.isAlpha(req.body.trailer)) {
            errors.push("Trailer should be alphabet");
        }

        if (!validator.isAlpha(req.body.characters)) {
            errors.push("Characters should be alphabet");
        }

        if (errors.length > 0) {
            return res.status(400).json({
                message: errors.join(", "),
            });
        }

        if (req.files) {
            const file = req.files.image;

            if (!file.mimetype.startsWith("image")) {
                errors.push("File must be an image");
            }

            if (file.size > 1000000) {
                errors.push("Image must be less than 1MB");
            }

            let fileName = crypto.randomBytes(16).toString("hex");

            file.name = `${fileName}${path.parse(file.name).ext}`;

            req.body.poster = file.name;

            file.mv(`./public/images/${file.name}`, async (err) => {
                if (err) {
                    console.log(err);

                    return res.status(500).json({
                        message: "Internal Server Error",
                        error: err.message,
                    });
                }
            });
        }

        next();
    } catch (e) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: e.message,
        });
    }
};

exports.delete = async (req, res, next) => {
    let errors = [];

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        errors.push(
            "id_movie is not valid and must be 24 character & hexadecimal"
        );
    }

    if (errors.length > 0) {
        return res.status(400).json({
            message: errors.join(", "),
        });
    }

    let data = await movie.findOne({ _id: req.params.id });

    if (!data) {
        errors.push("Movie not found");
    }

    if (errors.length > 0) {
        return res.status(400).json({
            message: errors.join(", "),
        });
    }

    next();
};