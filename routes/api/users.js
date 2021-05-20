const express = require("express");
const router = express.Router();
var bcrypt = require("bcryptjs");
//Item Model
const User = require("../../models/User");
const Seller = require("../../models/Seller");

// @route   GET api/User
// @desc    Get all User
// @access  Public

router.get("/", async (req, res) => {
  await User.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

router.get("/sale", async (req, res) => {
  await Seller.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

router.get("/sale/:id", async (req, res) => {
  await Seller.find({ _id: req.params.id })
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

router.get("/show/:id", (req, res) => {
  console.log(req.params.id);
  User.find({ _id: req.params.id }).then((item) => res.json(item));
});

//Register new User
router.post("/add", async (req, res) => {
  let user = await User.findOne({ Email: req.body.Email });
  if (user) return res.send("0");

  user = new User();
  user.Email = req.body.Email;
  user.Password = req.body.pwd;
  user.User_Name = req.body.name;
  user.status = req.body.status;

  user.save().then((user) => {
    res.send(user);
  });
});

//Login User
router.post("/login", async (req, res) => {
  let user = await User.findOne({ Email: req.body.Email });
  if (!user) {
    return res.send("0");
  }
  let Final_user = await User.findOne({
    Email: req.body.Email,
    Password: req.body.pwd,
  });
  if (!Final_user) {
    return res.send("1");
  } else {
    return res.send(user);
  }
});

//Login seller
router.post("/Seller_login", async (req, res) => {
  let user = await Seller.findOne({ Email: req.body.Email });
  if (!user) {
    return res.send("0");
  }
  let Final_user = await Seller.findOne({
    Email: req.body.Email,
    Password: req.body.pwd,
  });
  if (!Final_user) {
    return res.send("1");
  } else {
    return res.send(user);
  }
});

//Delete User
router.delete("/del/:id", (req, res) => {
  User.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});


// Delete Seller
router.delete("/delseller/:id", (req, res) => {
  Seller.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});


module.exports = router;
