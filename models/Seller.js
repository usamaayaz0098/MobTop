const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SellerSchema = new Schema({
  Password: String,
  Email: String,
  status: String,
  Shop_Name: String,
  Shop_Address: String,
  Image: String,
  Number: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Sellers = mongoose.model("seller", SellerSchema);
