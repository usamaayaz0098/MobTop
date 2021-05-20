import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./style.css";
const api = axios.create({
  baseURL: `http://localhost:8080/`,
});

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 270,
  },
});

export default function Cards() {
  //console.log(OffItems);
  let history = useHistory();
  const classes = useStyles();
  const [arr, setArr] = useState([]);
  const [arr2, setArr2] = useState([]);
  const [offArr, setOffArr] = useState([]);
  const [numofshops, setNumofshops] = useState(2);
  const [numofproducts, SetNumofproducts] = useState(2);
  const [voch, setVoch] = useState([]);
  const SearchValue = useSelector((state) => state.find.SearchValue);

  useEffect(() => {
    api.get("/api/shop/").then((res) => {
      setArr(res.data);
      console.log(res.data);
    });

    api.get("/api/user/sale").then((res) => {
      //console.log(res.data[0]);
      setArr2(res.data);
    });

    api.get("/api/voucher/s").then((res) => {
      console.log(res.data);
      setVoch(res.data);
    });
  }, []);

  useEffect(() => {
    api.get(`api/shop/search/${SearchValue}`).then((res) => {
      setArr(res.data);
      console.log(res.data);
    });
  }, [SearchValue]);

  const change = (e) => {
    console.log(e.target.value);
    if (e.target.value === "2") {
      setNumofshops(6);
      SetNumofproducts(0);
    }
    if (e.target.value === "1") {
      SetNumofproducts(6);
      setNumofshops(0);
    }
  };

  return (
    <div className="mt-5 ">
      <div className="container mt-5 mtx">
        <div className="row justify-content-between">
          <h3> {numofproducts !== 0 ? "Latest Products" : null} </h3>
          <p>
            <select
              class="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
              onChange={(value) => change(value)}
            >
              <option selected>Filter</option>
              <option value="1">View Products</option>
              <option value="2">View Shops</option>
            </select>
          </p>
        </div>

        <hr></hr>
        <div className="row justify-content-between mt-5">
          {arr.map((a, i) =>
            i <= numofproducts && numofproducts !== 0 ? (
              <Card
                className="col-12 col-md-6 col-lg-4 mb-5 crd"
                key={a._id}
                style={{ maxWidth: 330 }}
                onClick={() => history.push(`/Show/${a._id}/1`)}
              >
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={a.Image}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {a.ProductName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {a.Desc}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    {voch.map((m) =>
                      m.ProductOwner === a.ProductOwner
                        ? `Use voucher : ${m.ProductVoucher}`
                        : null
                    )}
                  </Button>
                </CardActions>
              </Card>
            ) : null
          )}
        </div>
        <br />
        <img
          className="img-fluid mb-5"
          src={process.env.PUBLIC_URL + "appl1.png"}
          alt="Product Info"
          style={{
            width: "100%",
          }}
        />
        <br />
        {numofshops !== 0 && <h3>Latest Shops</h3>}

        <hr />
        <div className="row justify-content-between mt-5">
          {arr2.map((a, i) =>
            i <= numofshops && numofshops !== 0 ? (
              <Card
                className="col-12 col-md-6 col-lg-4 mb-5 crd"
                key={a._id}
                style={{ maxWidth: 330 }}
                onClick={() => history.push(`/Show/${a._id}/2`)}
              >
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={a.Image}
                    style={{
                      height: 0,
                      paddingTop: "80.25%", // 16:9,
                      marginTop: "30",
                    }}
                    title={"AL-HAFEEZ-CENTRE-SHOP"}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {a.Shop_Name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {a.desc}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
