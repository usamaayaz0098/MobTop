import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import axios from "axios";
const api = axios.create({
  baseURL: `http://localhost:8080/`,
});

export default function Buyer() {
  let history = useHistory();
  const id = useSelector((state) => state.posts.id);
  const logged = useSelector((state) => state.posts.logged);
  const [arr2, setArr2] = useState([]);
  const [len, setLen] = React.useState(0);

  useEffect(() => {
    api.get(`api/shopping/myprods/${id}`).then((res) => {
      console.log(res.data[0]);
      if (res.data.length > 0) {
        setArr2(res.data[0].Orders);
        setLen(res.data.length);
      } else {
        setLen(0);
      }
    });
  }, [id]);
  return (
    <div>
      {!id && history.push("/")}
      <div className="container">
        <div className="row mt-5">
          <Avatar className="mt-0" />
          <h3 className="ml-2" style={{ textTransform: "capitalize" }}>
            {logged}'s dashboard
          </h3>
        </div>
        <hr />

        <h3 style={{ marginTop: 100 }}>My Order History</h3>

        {len > 0 ? (
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
              {Object.values(arr2).map((m, i) => {
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
                    <td> {m.product_cnt}</td>
                    <td>Rs {m.product_cnt * m.product_price}.00</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="mt-5">
            <p>YOUR CART IS EMPTY</p>
          </div>
        )}

        <hr />
        <div className="mt-5 mb-5">
          <h2
            className="mt-2 mr-4 btn btn-link btn-lg"
            onClick={() => history.push("/")}
          >
            Continue shopping :)
          </h2>
        </div>
      </div>
    </div>
  );
}
