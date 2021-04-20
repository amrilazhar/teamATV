const validator = require("validator");
const mongoose = require("mongoose");
const { user, review, movie, person } = require("../../models");

exports.create = async (req, res, next) => {
    try {
        let errors = [];

        // Check id_barang is valid or not
        if (!mongoose.Types.ObjectId.isValid(req.body.movie_id)) {
            errors.push(
                "movie_id is not valid and must be 24 character & hexadecimal"
            );
        }

        // Check id_pelanggan is valid or not
        // If the parameters is not valid it will go here
        if (errors.length > 0) {
            return res.status(400).json({
                message: errors.join(", "),
            });
        }

        // Find barang and pelanggan
        let findData = await Promise.all([
            movie.findOne({ _id: req.body.movie_id }),
        ]);

        // if barang not found
        if (!findData[0]) {
            errors.push("Barang not found");
        }

        // Check is jumlah numeric?
        if (!validator.isNumeric(req.body.rating)) {
            errors.push("Jumlah must be a number");
        }

        if (!validator.isAlpha(req.body.review)) {
            errors.push("Jumlah must be a number");
        }

        // If errors
        if (errors.length > 0) {
            return res.status(400).json({
                message: errors.join(", "),
            });
        }

        // Calculate total
        req.body.movie_id = findData[0];
        // Go to next
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

        // Check parameter id is valid or not
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            errors.push(
                "id_review is not valid and must be 24 character & hexadecimal"
            );
        }

        // Check id_pelanggan is valid or not
        if (!mongoose.Types.ObjectId.isValid(req.body.movie_id)) {
            errors.push(
                "movie_id is not valid and must be 24 character & hexadecimal"
            );
        }

        // If the parameters is not valid it will go here
        if (errors.length > 0) {
            return res.status(400).json({
                message: errors.join(", "),
            });
        }

        // Find barang, pelanggan and transaksi
        let findData = await Promise.all([
            movie.findOne({ _id: req.body.movie_id }),
            review.findOne({ _id: req.params.id }),
        ]);

        // if barang not found
        if (!findData[0]) {
            errors.push("movie not found");
        }

        // If pelanggan not found
        if (!findData[1]) {
            errors.push("review not found");
        }


        // Check jumlah is numeric
        if (!validator.isNumeric(req.body.rating)) {
            errors.push("Jumlah must be a number");
        }

        if (!validator.isAlpha(req.body.review)) {

            errors.push("Jumlah must be a number");
        }
        // If error
        if (errors.length > 0) {
            return res.status(400).json({
                message: errors.join(", "),
            });
        }

        // Calculate total
        req.body.movie_id = findData[0];

        // Go to next
        next();
    } catch (e) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: e.message,
        });
    }
}

exports.delete = async (req, res, next) => {
    try {
        let errors = [];

        // Check params is valid or not
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            errors.push(
                "id_review is not valid and must be 24 character & hexadecimal"
            );
        }

        // If params error
        if (errors.length > 0) {
            return res.status(400).json({
                message: errors.join(", "),
            });
        }

        // Find one transaksi
        let data = await review.findOne({ _id: req.params.id });

        // If transaksi not found
        if (!data) {
            errors.push("Transaksi not found");
        }

        // If error
        if (errors.length > 0) {
            return res.status(400).json({
                message: errors.join(", "),
            });
        }

        // Go to next
        next();
    } catch (e) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: e.message,
        });
    }
};
