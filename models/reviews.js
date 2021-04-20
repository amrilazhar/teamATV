const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const ReviewSchema = new mongoose.Schema(
  {
    user_id : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    movie_id : {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref : 'movies',
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// Prevent user for submitting more than one review per movie
ReviewSchema.index({ movie_id: 1, user_id: 1 }, { unique: true });

// Static method to get averaga rating
ReviewSchema.statics.getAverageRating = async function (movieId) {

  const obj = await this.aggregate([
    {
      $match: { movie_id: movieId },
    },
    {
      $group: {
        _id: "$movie_id",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  try {
    await this.model("movies").findByIdAndUpdate(movieId, {
      avg_rating: obj[0].averageRating,
    });
  } catch (e) {
    console.error(e);
  }
};

// call getAverageCost after save
ReviewSchema.post("save", function () {
  this.constructor.getAverageRating(this.movie_id);
});

// call getAverageCost after update
ReviewSchema.post("update", function () {
  this.constructor.getAverageRating(this.movie_id);
});

// call getAverageCost after remove
ReviewSchema.post("remove", function () {
  this.constructor.getAverageRating(this.movie_id);
});

ReviewSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("reviews", ReviewSchema, "reviews");
