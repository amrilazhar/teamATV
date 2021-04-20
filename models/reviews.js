const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
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

ReviewSchema.plugin(mongoosePaginate);
ReviewSchema.plugin(mongoose_delete, { overrideMethods: "all" });

module.exports = mongoose.model("reviews", ReviewSchema, "reviews");
