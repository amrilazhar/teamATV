const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const PersonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    job : {
      type: Array,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    birthday: {
      type: Date,
      required: false,
    },
    picture: {
      type: String,
      required: false,
      default : "images/defaultProfile.jpg",
    },
    movie_list: {
      type: Array,
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


PersonSchema.plugin(mongoose_delete, { overrideMethods: "all" });

module.exports = mongoose.model("persons", PersonSchema, "persons");
