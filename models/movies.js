const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    director : {
      type: mongoose.Schema.ObjectId,
      required: false,
    },
    budget: {
      type: Number,
      required: false,
    },
    release_date: {
      type: Date,
      required: false,
    },
    synopsis: {
      type: String,
      required: false,
    },
    genre: {
      type: Array,
      required: false,
    },
    tags: {
      type: Array,
      required: false,
    },
    trailer: {
      type: String,
      required: false,
    },
    isReleased: {
      type: Boolean,
      required: false,
    },
    rated: {
      type: String,
      required: false,
    },
    poster: {
      type: String,
      required: false,
      default:"images/defaultPoster.jpg",
    },
    count_review: {
      type: Number,
      required: false,
    },
    total_rating: {
      type: Number,
      required: false,
    },
    characters: {
      type: Array,
      required: false,
    },
    isFeatured: {
      type: Boolean,
      required: false,
    },
    updatedBy : {
      type :  mongoose.Schema.ObjectId,
      required : false,
    },
    user_reviewed : {
      type : Array,
      required : false,
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);


MovieSchema.plugin(mongoose_delete, { overrideMethods: "all" });

module.exports = mongoose.model("movies", MovieSchema, "movies");
