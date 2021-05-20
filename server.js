const express = require("express");
const app = express();
const http = require("http").Server(app);
const fileUpload = require("express-fileupload");
const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const users = require("./routes/api/users");
const shop = require("./routes/api/shops");
const User = require("./models/Shop");
const Seller = require("./models/Seller");
const shopping = require("./routes/api/shopping");
const Voucher = require("./routes/api/voucher");
var cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

//upload products
app.post("/upload", (req, res) => {
  const file = req.files.file;
  const PN = req.body.PN;
  const PP = req.body.PP;
  const PQ = req.body.PQ;
  const PD = req.body.PD;
  const PT = req.body.PT;
  const PO = req.body.PO;
  const PV = req.body.PV;
  const Percent = req.body.percent;

  file.mv(`${__dirname}/client/public/${file.name}`, (err) => {
    if (err) {
      console.error(err);
    }
    user = new User();
    user.ProductName = PN;
    user.ProductPrice = PP;
    user.Image = file.name;
    user.ProductQuantity = PQ;
    user.ProductType = PT;
    user.ProductOwner = PO;
    user.Desc = PD;
    user.ProductVoucher = PV;
    user.ProductPercent = Percent;
    user.save().then((user) => {
      res.send(user);
    });
  });
});

//upload products
app.post("/uploadSeller", async (req, res) => {
  console.log("2");
  const file = req.files.file;
  const email = req.body.Email;
  const SN = req.body.ShopName;
  const SA = req.body.ShopAddress;
  const SP = req.body.Pwd;
  const Number = req.body.Number;

  file.mv(`${__dirname}/client/public/${file.name}`, (err) => {
    if (err) {
      console.error(err);
    }
    user = new Seller();

    user.Image = file.name;
    user.Email = email;
    user.Shop_Name = SN;
    user.Shop_Address = SA;
    user.Password = SP;
    user.status = "2";
    user.Number = Number;
    user.save().then((user) => {
      res.send(user);
    });
  });
});

//connection with db
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected"))
  .catch((err) => console.log("Event occurred, Try restarting the server"));

// Use Routes
app.use("/api/user/", users);
app.use("/api/shop/", shop);
app.use("/api/voucher/", Voucher);
app.use("/api/shopping/", shopping);

// // production code

// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

http.listen(8080);
