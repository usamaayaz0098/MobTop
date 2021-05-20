const express = require("express");
const router = express.Router();
var bcrypt = require("bcryptjs");
//Item Model
const User = require("../../models/Shop");

// @route   GET api/User
// @desc    Get all User
// @access  Public

router.get("/", async (req, res) => {
  await User.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

router.get("/search/:id", async (req, res) => {
  if(req.params.id === "null"){
    console.log("sss")
    await User.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
  }else{
    await User.find({ ProductName : { $regex: '.*' + req.params.id + '.*' ,  $options: 'i' } })
    .sort({ date: -1 })
    .then((items) => res.json(items));
  }
  
});

router.get("/editprods/:id", async (req, res) => {
  console.log(req.params.id);
  await User.find({ _id: req.params.id }).then((user) => res.json(user));
});

//Register new User
router.post("/edit_data", async (req, res) => {
  await User.updateOne(
    { _id: req.body.Pid },
    {
      $set: {
        ProductPrice: req.body.PP,
        ProductName: req.body.PN,
        ProductType: req.body.PT,
        Desc: req.body.desc,
        ProductQuantity: req.body.PQ,
      },
    }
  ).then((items) => res.json(items));
});

//filter
router.get("/filter/:id", async (req, res) => {
  if (req.params.id === "1") {
    await User.find()
      .sort({ ProductPrice: -1 })
      .then((items) => res.json(items));
  }

  if (req.params.id === "2") {
    await User.find()
      .sort({ ProductPrice: 1 })
      .then((items) => res.json(items));
  }
});

//category
router.get("/cat/:id", async (req, res) => {
  if (req.params.id === "1") {
    await User.find({ ProductType: "Laptop" })
      .sort({ date: -1 })
      .then((items) => res.json(items));
  }
  if (req.params.id === "2") {
    await User.find({ ProductType: "Phones" })
      .sort({ date: -1 })
      .then((items) => res.json(items));
  }
  if (req.params.id === "3") {
    await User.find({ ProductType: "Tabs" })
      .sort({ date: -1 })
      .then((items) => res.json(items));
  }
  if (req.params.id === "4") {
    await User.find({ ProductType: "Mouse" })
      .sort({ date: -1 })
      .then((items) => res.json(items));
  }
  if (req.params.id === "5") {
    await User.find({ ProductType: "Gaming" })
      .sort({ date: -1 })
      .then((items) => res.json(items));
  }
});

//find products of owners
router.get("/findowner/:id", async (req, res) => {
  await User.find({ ProductOwner: req.params.id })
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

router.get("/show/:id", async (req, res) => {
  await User.find({ _id: req.params.id }).then((item) => res.json(item));
});

//Delete User
router.delete("/del/:id", (req, res) => {
  User.findById(req.params.id)
    .then((item) => item.remove().then((user) => res.json(user)))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
