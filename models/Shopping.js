const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShoppingSchema = new Schema({
  Address: String,
  Email: String,
  Contact: Number,
  Zip: Number,
  City: String,
  Bank: String,
  Loc: String,
  Orders: Array,
  Owner: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Shoppings = mongoose.model("Shopping", ShoppingSchema);
