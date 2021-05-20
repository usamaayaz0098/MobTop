import React, { useEffect, useState } from "react";
import { toLower } from "lodash";
import "./style.css";
import axios from "axios";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { AddCart } from "../actions/postAction";
import { useDispatch, useSelector } from "react-redux";
import PhoneIcon from "@material-ui/icons/Phone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BusinessIcon from "@material-ui/icons/Business";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
const api = axios.create({
  baseURL: `http://localhost:8080/api/`,
});

var owner;

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function DenseTable(props) {
  let history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.posts.cartItem);
  //const id = useSelector((state) => state.posts.id);

  const [per, setPer] = useState(false);
  const [tag, setTage] = useState("");
  const [cnt, setCnt] = useState(0);
  const [arr, setArr] = React.useState([]);
  const [values, setValues] = React.useState({
    PN: "",
    PP: "",
    PQ: "",
    PT: "",
    PO: "",
    PD: "",
    date: "",
    img: "",
    PID: "",
    Number: "",
  });
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [VochName, setVochName] = React.useState("");
  const [voch, setVoch] = useState([]);
  const [off, setOff] = useState("");

  const use = () => {
    console.log("tag", tag);
    console.log("name", VochName);
    if (toLower(tag) === toLower(VochName)) {
      alert(`Congratulations! Voucher of ${off}%  has been applied`);
      setPer(true);
      setOpen(false);
    } else {
      alert("Oops!. Voucher does not exists.");
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    findProduct();
    findVouchers();
    finOwner();
  }, [props.match.params.id, props.match.params.type]);

  const findProduct = async () => {
    let id = props.match.params.id;
    let type = props.match.params.type;

    if (type === "1") {
      await api.get(`/shop/show/${id}`).then((res) => {
        console.log(res.data);
        owner = res.data[0].ProductOwner;
        setValues({
          PID: res.data[0]._id,
          PN: res.data[0].ProductName,
          PP: res.data[0].ProductPrice,
          PQ: res.data[0].ProductQuantity,
          PT: res.data[0].ProductType,
          PO: res.data[0].ProductOwner,
          PD: res.data[0].Desc,
          date: res.data[0].date,
          img: res.data[0].Image,
        });
      });
    } else if (type === "2") {
      await api.get(`/user/sale/${id}`).then((res) => {
        setValues({
          PID: res.data[0]._id,
          PN: res.data[0].Shop_Name,
          PP: res.data[0].Shop_Address,
          img: res.data[0].Image,
          PT: res.data[0].Email,
          Number: res.data[0].Number,
        });
      });

      await api.get(`/user/getitems/${id}`).then((res) => {
        setValues({
          PID: res.data[0]._id,
          PN: res.data[0].Shop_Name,
          PP: res.data[0].Shop_Address,
          img: res.data[0].Image,
          PT: res.data[0].Email,
          Number: res.data[0].Number,
        });
      });
    }
  };

  const findVouchers = async () => {
    await api.get("/voucher/s").then((res) => {
      for (var i = 0; i < res.data.length; i++) {
        if (res.data[i].ProductOwner === owner) {
          setTage(res.data[i].ProductVoucher);
          setOff(res.data[i].ProductPercent);
        }
      }
      setVoch(res.data);
    });
  };

  const finOwner = async () => {
    await api.get(`shop/findowner/${props.match.params.id}`).then((res) => {
      console.log(res.data);
      setArr(res.data);
    });
  };

  function add() {
    setCnt(cnt + 1);
  }

  function sub() {
    if (cnt > 0) {
      setCnt(cnt - 1);
    }
  }
  function addToCart() {
    const cartData = [...cart];
    const found1 = cartData.find(
      (element) => element.product_id === values.PID
    );
    if (found1) {
      found1.product_cnt = found1.product_cnt + cnt;
    } else {
      if (per) {
        const data = {
          product_id: values.PID,
          product_name: values.PN,
          product_price: values.PP - (values.PP * off) / 100,
          product_img: values.img,
          product_cnt: cnt,
        };
        cartData.push(data);
      } else {
        const data = {
          product_id: values.PID,
          product_name: values.PN,
          product_price: values.PP,
          product_img: values.img,
          product_cnt: cnt,
        };

        cartData.push(data);
      }
    }

    dispatch(AddCart(cartData));
  }

  return (
    <div className="mt-5 container">
      {props.match.params.type === "1" ? (
        <div className="row jbx" style={{ padding: 30 }}>
          <div className="col-lg-5 col-12">
            <img
              className="img-fluid"
              src={process.env.PUBLIC_URL + `/${values.img}`}
              alt="Product Info"
              style={{
                height: 309,
              }}
            />
          </div>

          <br />
          <div className="col-lg-7 col-10">
            <h3 style={{ textTransform: "uppercase" }}>
              {values.PN} - {values.PT}{" "}
            </h3>
            <hr />
            <button className="btn btn-info" onClick={handleOpen}>
              Have a voucher?
            </button>

            <row className="row mt-5">
              <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-warning" onClick={sub}>
                  -
                </button>
                <button type="button" class="btn btn-light btx">
                  {cnt}
                </button>
                <button type="button" class="btn btn-warning" onClick={add}>
                  +
                </button>
              </div>
              <div>
                <button className="btn btn-dark ml-3" onClick={addToCart}>
                  {" "}
                  <AddShoppingCartIcon /> Add to cart
                </button>
              </div>
            </row>
            <div className="mt-3">
              <b>Description :</b>
              <p>{values.PD}</p>
            </div>
            {per ? (
              <div className="mt-3">
                <del>Rs. {values.PP}.00</del>
                <br />
                Rs. {values.PP - (values.PP * off) / 100}.00
              </div>
            ) : (
              <div className="mt-3">
                <p>Rs. {values.PP}.00</p>
              </div>
            )}
            <div className="mt-3">
              <p>Total available: {values.PQ}</p>
            </div>
            <div className="mt-3">
              <p>Updated last: {values.date}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="row jumbotron jbx">
          <div className="col-lg-5 col-12">
            <img
              className="img-fluid"
              src={process.env.PUBLIC_URL + `/${values.img}`}
              alt="Product Info"
              style={{
                height: 309,
              }}
            />
          </div>
          <br />
          <div className="col-lg-7 col-10">
            <h2 style={{ textTransform: "uppercase" }} className="ml-5">
              {values.PN}{" "}
            </h2>
            <hr />

            <div className="row justify-content-around">
              <p>
                {" "}
                <MailOutlineIcon /> {values.PT}{" "}
              </p>

              <p>
                <BusinessIcon />
                {values.PP}
              </p>
            </div>

            <div className="row ml-5 mt-3">
              <p>
                <PhoneIcon />
                {values.Number}
              </p>
            </div>
          </div>
          <br />
          <table className="table table-hover mt-5">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Products</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {arr.map((a, i) => (
                <tr key={a._id}>
                  <td>{i + 1}</td>
                  <td>
                    <img
                      className="img-fluid"
                      src={process.env.PUBLIC_URL + `/${a.Image}`}
                      alt="Product Info"
                      style={{
                        width: "30%",
                      }}
                    />
                    <br />
                    <hr />
                    <h3
                      className="btn btn-link"
                      onClick={() => history.push(`/Show/${a._id}/1`)}
                    >
                      {a.ProductName}
                    </h3>
                  </td>
                  <td>{a.ProductPrice}</td>
                  <td>{a.ProductQuantity}</td>
                  <td>{a.Desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <p id="transition-modal-description">Add voucher tag.</p>
            <br />
            <input
              type="text"
              placeholder="voucher"
              className="form-control"
              value={VochName}
              onChange={(e) => setVochName(e.target.value)}
            />
            <br />
            <button className="btn btn-dark" onClick={use}>
              USE
            </button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
