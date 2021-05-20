import React, { useEffect } from "react";
import axios from "axios";

import "./style.css";
import { useHistory } from "react-router-dom";
const api = axios.create({
  baseURL: `http://localhost:8080/api/shop`,
});

export default function Category(props) {
  const [arr, setArr] = React.useState([]);
  const [len, setLen] = React.useState(0);
  const [filters, setFilters] = React.useState("");
  let history = useHistory();

  useEffect(() => {
    let e = props.match.params.id;
    api.get(`/cat/${e}`).then((res) => {
      console.log(res.data);
      setLen(res.data.length);
      setArr(res.data);
    });
  }, [props.match.params.id]);

  const change = (e) => {
    setFilters(e);
    api.get(`/filter/${e}`).then((res) => {
      console.log(res.data);
      setLen(res.data.length);
      setArr(res.data);
    });
  };
  return (
    <div className="container mt-5">
      <div className="jbb">
        <div className="row justify-content-between ">
          <p className="ml-5 mt-2">{len} products found</p>
          <select
            className="slc mr-5 mt-2"
            value={filters}
            onChange={(e) => change(e.target.value)}
          >
            <option value="0">Sort by latest</option>
            <option value="1">Price: High to low</option>
            <option value="2">Price: Low to high</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-between mt-5">
        {len > 0 ? (
          arr.map((a, i) => (
            <div
              className="card mb-5 crd"
              style={{ width: 330, height: 350, cursor: "pointer" }}
              onClick={() => history.push(`/Show/${a._id}/1`)}
              key={i}
            >
              <img
                className="img-fluid mt-3"
                src={process.env.PUBLIC_URL + `/${a.Image}`}
                alt="Product Info"
                style={{
                  height: 230,
                  width: 270,
                  alignSelf: "center",
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{a.ProductName}</h5>

                <p className="card-text btn-link">Rs {a.ProductPrice}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No post yet</p>
        )}
      </div>
    </div>
  );
}
