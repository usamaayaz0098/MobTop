const express = require("express");
const Voucher = require("../../models/Voucher");
const router = express.Router();

router.get("/s", async (req, res) => {
  await Voucher.find().then((items) => res.json(items));
});

router.get("/s/:id", async (req, res) => {
  await Voucher.find({ ProductOwner: req.params.id }).then((items) =>
    res.json(items)
  );
});

//Register new cart
router.post("/savevoch", async (req, res) => {
  console.log(req.body.percent);
  user = new Voucher();  
  user.ProductOwner = req.body.owner;
  user.ProductVoucher = req.body.voucher;
  user.ProductPercent = req.body.percent;

  await user.save().then((user) => {
    res.send(user);
  });
});

// //Delete User
// router.delete("/del/:id", (req, res) => {
//   // Voucher.deleteOne({ ProductVoucher: req.params.id }).then((item) => {
//   //   res.json(item);
//   // });
//   Voucher.find({ ProductVoucher: req.params.id })
//     .then((item) => item.remove().then(() => res.json({ success: true })))
//     .catch((err) => res.status(404).json({ success: false }));
// });

//Delete User
router.delete("/dele/:id", (req, res) => {
  Voucher.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});


module.exports = router;
