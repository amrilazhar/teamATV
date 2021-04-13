const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const ReviewSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    movie_id : {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);


ReviewSchema.plugin(mongoose_delete, { overrideMethods: "all" });

module.exports = mongoose.model("reviews", ReviewSchema, "reviews");
