const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const mongoosePaginate = require('mongoose-paginate-v2');

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    director : {
      type: String,
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
    avg_rating : {
      type : Number,
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

MovieSchema.plugin(mongoosePaginate);
MovieSchema.plugin(mongoose_delete, { overrideMethods: "all" });

module.exports = mongoose.model("movies", MovieSchema, "movies");
