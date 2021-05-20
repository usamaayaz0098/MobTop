const express = require("express");
const Shop = require("../../models/Shop");
const router = express.Router();

//Item Model
const Shopping = require("../../models/Shopping");
var arr = [];
// @route   GET api/User
// @desc    Get all User
// @access  Public

router.get("/", async (req, res) => {
  await Shopping.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

router.get("/myprods/:id", async (req, res) => {
  await Shopping.find({ Owner: req.params.id })
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

//Register new cart
router.post("/save", async (req, res) => {
  let sh = await Shopping.find({ Owner: req.body.id });
  if (sh) {
    await Shopping.updateOne(
      { Owner: req.body.id },
      {
        $push: {
          Orders: req.body.send,
        },
      }
    ).then((user) => res.send(user));
  }
  if (sh.length == 0) {
    user = new Shopping();
    user.Orders = req.body.send;
    user.Owner = req.body.id;

    user.save().then((user) => {
      res.send(user);
    });
  }
});

//Delete User
router.delete("/del/:id", (req, res) => {
  Shopping.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
