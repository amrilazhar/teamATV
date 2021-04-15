const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const bcrypt = require("bcrypt"); // Import bcrypt

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
      set: encryptPwd,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    watchlist: {
      type: Array,
      required: false,
    },
    profile_picture: {
      type: String,
      required: false,
      get : getImage,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

function getImage(image) {
  return image && `/images/${image}`;
}

function encryptPwd(password) {
  return bcrypt.hashSync(password, 10);
}
UserSchema.plugin(mongoose_delete, { overrideMethods: "all" });

module.exports = mongoose.model("user", UserSchema, "user");
