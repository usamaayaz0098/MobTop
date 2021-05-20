const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShopSchema = new Schema({
  ProductName: String,
  ProductPrice: Number,
  Image: String,
  ProductQuantity: Number,
  ProductType: String,
  ProductOwner: String,
  Desc: String,
  ProductVoucher: String,
  ProductPercent: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Shops = mongoose.model("shop", ShopSchema);
