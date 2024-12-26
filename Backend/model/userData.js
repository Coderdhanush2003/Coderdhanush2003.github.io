const mongoose = require("mongoose");

const scheme = new mongoose.Schema({
  uid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cart: {
    type: [],
    default: undefined,
  },
  favourites: {
    type: [],
    default: undefined,
  },
});

const userData = mongoose.model("userData", scheme);

module.exports = userData;
