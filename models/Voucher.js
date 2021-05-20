const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VoucherSchema = new Schema({
  ProductOwner: String,
  ProductVoucher: String,
  ProductPercent: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Vouchers = mongoose.model("voucher", VoucherSchema);
