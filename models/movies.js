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
      default:"defaultPoster.jpg",
      get : getImagePoster,
    },
    backdrop: {
      type: String,
      required: false,
      default:"defaultBackdrop.jpg",
      get : getImageBackdrop,
    },
    characters: {
      type: Array,
      required: false,
      get : getImageCharacters,
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
    toJSON: { getters: true },
  }
);

function getImagePoster(image) {
  return process.env.PUBLIC_URL ? process.env.PUBLIC_URL+ `/images/poster{image}` : `/images/poster${image}`;
}

function getImageBackdrop(image) {
  return process.env.PUBLIC_URL ? process.env.PUBLIC_URL+ `/images/backdrop${image}` : `/images/backdrop${image}`;
}

function getImageCharacters(data) {
  let ret = data.map( item => {
    let obj = {
      role_name : item.role_name,
      photo : process.env.PUBLIC_URL ? process.env.PUBLIC_URL+ `/images/cast${item.photo}` : `/images/cast${item.photo}`
    };
    return obj;
  });
  return ret;
}

MovieSchema.plugin(mongoosePaginate);
MovieSchema.plugin(mongoose_delete, { overrideMethods: "all" });

module.exports = mongoose.model("movies", MovieSchema, "movies");
