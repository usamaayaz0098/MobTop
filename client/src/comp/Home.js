import React, { useState } from "react";
import Cards from "./Cards";
import SearchIcon from "@material-ui/icons/Search";
import "./style.css";
import { useDispatch } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
export default function Home() {
  const [src, setSrc] = useState("");
  const dispatch = useDispatch();
  const search = (e) => {
    setSrc(e);
  };
  const submit = () => {
    let go;
    if (src === "") {
      go = "null";
    } else {
      go = src;
    }
    dispatch({ type: "search", payload: go });
  };
  return (
    <div>
      <div style={{ backgroundColor: "white", height: 500 }}>
        {/* <img
          className="img-fluid "
          src={process.env.PUBLIC_URL + "appl2.png"}
          alt="Product Info"
          style={{
            width: "100%",
          }}
        /> */}
        <Carousel interval={2000}>
          <Carousel.Item>
            <img className="d-block w-100" src="appl2.png" alt="First slide" />
            <Carousel.Caption>
              {/* <p>An Electronic Plateform where All Phones are Available Here</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="appl3.jpg" alt="Second slide" />
            <Carousel.Caption>
              {/* <p>
                An Electronic Plateform where All Accessories are Available Here
              </p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="appl4.jpg" alt="Third slide" />

            <Carousel.Caption>
              {/* <p>
                An Electronic Plateform where All Laptops are Available Here
              </p> */}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        {/* SearchSystem */}
        <div className="container mt-5" style={{ marginTop: "34" }}>
          <div class="input-group">
            <input
              type="text"
              list="types"
              class="form-control"
              placeholder="Search Phones, Laptops etc..."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              style={{ borderColor: "black" }}
              onChange={(e) => search(e.target.value)}
            />
            <div class="input-group-append">
              <button
                class="btn btn-danger"
                type="button"
                onClick={submit}
                style={{ height: 38 }}
              >
                <SearchIcon />
              </button>
            </div>
          </div>

          <datalist id="types" className="tyx">
            <option
              style={{ width: 200 }}
              className="tyx"
              value="Iphone 12 pro max"
            />
            <option style={{ width: 200 }} value="GTX 1050 Ti " />
            <option style={{ width: 200 }} value="Mac book pro" />
            <option style={{ width: 200 }} value="p20 lite huawei" />
          </datalist>
        </div>
      </div>

      <Cards />
    </div>
  );
}
