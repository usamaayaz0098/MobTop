import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import LockIcon from "@material-ui/icons/Lock";
import { AddCart } from "../actions/postAction";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";

import Fade from "@material-ui/core/Fade";
import axios from "axios";
import { Checkbox } from "@material-ui/core";

const api = axios.create({
  baseURL: `http://localhost:8080/`,
});
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
export default function Cart() {
  let history = useHistory();
  const counter = useSelector((state) => state.posts.cartItem);

  const id = useSelector((state) => state.posts.id);
  const [total, setTotal] = useState();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [City, setCity] = React.useState("");
  const [Loc, setLoc] = React.useState("");
  const [Bank, setBank] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [Contact, setContact] = React.useState("");
  const [Address, setAddress] = React.useState("");
  const [Zip, setZip] = React.useState("");
  const [send] = React.useState([]);
  const [arr] = React.useState({});

  useEffect(() => {
    let temp = 0;
    if (counter.length > 0) {
      Object.values(counter).map((m, i) => {
        temp = temp + m.product_price * m.product_cnt;
        arr[i] = m.product_id;
        send.push(m);
        return true;
      });
      setTotal(temp);
    }
  }, [counter, arr, send]);

  const dispatch = useDispatch();
  function add(value) {
    const cartData = [...counter];
    const found = cartData.find(
      (element) => element.product_id === value.product_id
    );
    found.product_cnt = found.product_cnt + 1;

    dispatch(AddCart(cartData));
  }

  function sub(value) {
    let cartData = [...counter];
    const found = cartData.find(
      (element) => element.product_id === value.product_id
    );
    if (value.product_cnt === 1) {
      cartData = cartData.filter((x) => x.product_id !== value.product_id);
    } else {
      found.product_cnt = found.product_cnt - 1;
    }

    dispatch(AddCart(cartData));
  }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const checkout = async (event) => {
    // console.log(arr);
    const data = {
      id,
      send,
    };
    await api.post("/api/shopping/save", data).then((res) => {
      console.log(res.data);
      alert("Congratulations your order will be delivered in two working days");
      dispatch({ type: "REMOVE_CART" });
      history.push("/");
    });
  };
  return (
    <div className="container">
      {!id && history.push("/login/1")}
      <h2 className="mt-5">Shopping cart</h2>

      <table class="table mt-5  table-hover">
        <thead>
          <tr>
            <th scope="col">Sr.</th>
            <th scope="col">Products</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(counter).map((m, i) => {
            return (
              <tr>
                <th scope="row">{i + 1}</th>
                <td>
                  <img
                    className="img-fluid"
                    src={process.env.PUBLIC_URL + `/${m.product_img}`}
                    alt="Product Info"
                    style={{
                      height: 100,
                      width: 150,
                    }}
                  />{" "}
                  <hr />
                  <h2
                    onClick={() => history.push(`/Show/${m.product_id}/1`)}
                    className="btn btn-link btn-lg"
                  >
                    {m.product_name}
                  </h2>
                </td>
                <td>Rs {m.product_price}.00</td>
                <td>
                  <row className="row">
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        type="button"
                        class="btn"
                        style={{ backgroundColor: "#f50057", color: "white" }}
                        onClick={() => sub(m)}
                      >
                        -
                      </button>
                      <button type="button" class="btn btn-light btx1">
                        {m.product_cnt}
                      </button>
                      <button
                        type="button"
                        class="btn"
                        style={{ backgroundColor: "#f50057", color: "white" }}
                        onClick={() => add(m)}
                      >
                        +
                      </button>
                    </div>
                  </row>
                </td>
                <td>Rs {m.product_cnt * m.product_price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="jumbotron">
        <div className="row justify-content-end">
          <h3 className="mr-5">Subtotal:</h3>
          <h3>Rs {total}.00</h3>
        </div>
        <br />
        <button
          className="btn float-right"
          style={{ backgroundColor: "#f50057", color: "white" }}
          onClick={handleOpen}
        >
          {" "}
          <LockIcon /> Checkout
        </button>
        <br />
        <br />
        <button
          className="btn btn-link float-right"
          onClick={() => history.push("/")}
        >
          {" "}
          Continue shopping
        </button>
      </div>
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
            <h2 id="transition-modal-title">Checkout</h2>
            <hr />
            <p id="transition-modal-description">
              <div class="form-row mt-5 ">
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail4"
                    placeholder="Email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPassword4">Phone number</label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputPassword4"
                    placeholder="Contact"
                    value={Contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="inputAddress">Shipping Address</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                  value={Address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputCity">City</label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputCity"
                    value={City}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div class="form-group col-md-4">
                  <label for="inputState">State</label>
                  <select
                    id="inputState"
                    class="form-control"
                    value={Loc}
                    onChange={(e) => setLoc(e.target.value)}
                  >
                    <option selected>Choose...</option>
                    <option>Punjab</option>
                    <option>Sindh</option>
                    <option>Balochistan</option>
                  </select>
                </div>
                <div class="form-group col-md-2">
                  <label for="inputZip">Postal Code</label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputZip"
                    value={Zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </div>
                <div class="form-group">
                  <input
                    type="radio"
                    id="CashOnDelivary"
                    name="payment"
                    value="CashOnDelivary"
                  />{" "}
                  <label for="inputAddress2"> Cash On Delivary </label>{" "}
                  <br></br>
                  <input
                    type="radio"
                    id="CreditCard"
                    name="payment"
                    value="CreditCard"
                  />{" "}
                  <label for="inputAddress2">Credit cart number</label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputAddress2"
                    placeholder="Card number"
                    value={Bank}
                    onChange={(e) => setBank(e.target.value)}
                  />
                </div>
              </div>

              <button type="button" class="btn btn-danger" onClick={checkout}>
                Checkout
              </button>
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
