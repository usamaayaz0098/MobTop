import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Backdrop from "@material-ui/core/Backdrop";
import { useHistory } from "react-router-dom";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/postAction";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import LaptopIcon from "@material-ui/icons/Laptop";
import TabletMacIcon from "@material-ui/icons/TabletMac";
import MouseIcon from "@material-ui/icons/Mouse";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import FavoriteIcon from "@material-ui/icons/Favorite";
const useStyles = makeStyles((theme) => ({
  rootX: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  rootsx: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
}));

export default function ButtonAppBar(props) {
  const dispatch = useDispatch();
  let history = useHistory();

  const name = useSelector((state) => state.posts.logged);
  const id = useSelector((state) => state.posts.id);
  const admin = useSelector((state) => state.posts.admin);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [counters, setCounters] = useState(0);

  const counter = useSelector((state) => state.posts.cartItem);
  const type = useSelector((state) => state.posts.status);

  useEffect(() => {
    let temp = 0;
    Object.values(counter).map((m) => {
      temp = m.product_cnt + temp;
      return true;
    });
    setCounters(temp);
  }, [counter]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleReg = (e) => {
    setAnchorEl(null);
    history.push(`/login/${e}`);
  };
  const handleLogout = () => {
    dispatch(logout());
    setAnchorEl(null);
  };

  const home = () => {
    if (type === "1") {
      setAnchorEl(null);
      history.push("/buyer_dashboard");
    }
    if (type === "2") {
      setAnchorEl(null);
      history.push("/seller_dashboard");
    }
  };

  const cat = (e) => {
    history.push(`/category/${e}`);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{ backgroundColor: "#333333" }}>
        <Toolbar>
          <Typography
            variant="h5"
            onClick={() => history.push("/")}
            className={classes.title}
            style={{ cursor: "pointer", color: "#52a9c4" }}
          >
            Mob<b>Top</b>
          </Typography>
          {/* wishlist icon */}
          <div className={classes.rootX}>
            <Link style={{ color: "white" }}>
              <Badge color="secondary" style={{ cursor: "pointer" }}>
                {" "}
                Wishlist <FavoriteIcon />
              </Badge>
            </Link>
          </div>
          {/* cart icon */}
          <div className={classes.rootX}>
            <Link to="/cart" style={{ color: "white" }}>
              <Badge
                badgeContent={counters}
                color="secondary"
                style={{ cursor: "pointer" }}
              >
                {" "}
                Cart <ShoppingCartIcon />
              </Badge>
            </Link>
          </div>
          {!id && !admin ? (
            <Button onClick={handleClick} color="inherit">
              Login{<p className="ml-2"></p>}
              <AccountCircleIcon fontSize="small" />{" "}
            </Button>
          ) : admin ? (
            <Button onClick={handleClick} color="inherit">
              Admin
              {<p className="ml-2"></p>} <ArrowDropDownIcon fontSize="small" />
            </Button>
          ) : (
            <Button onClick={handleClick} color="inherit">
              {name}
              {<p className="ml-2"></p>} <ArrowDropDownIcon fontSize="small" />
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        {id ? (
          <div>
            <MenuItem onClick={home}>Home</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem onClick={() => handleReg(1)}>As a buyer</MenuItem>
            <MenuItem onClick={() => handleReg(2)}>As a seller</MenuItem>
          </div>
        )}
      </Menu>

      {!admin && (
        <div
          className="bg-danger d-flex col-12 justify-content-around"
          style={{ marginTop: 64 }}
        >
          <p className="btn btn-link text-light mt-2" onClick={() => cat(1)}>
            <LaptopIcon /> Laptops
          </p>
          <p className="text-light btn btn-link mt-2" onClick={() => cat(2)}>
            <PhoneIphoneIcon /> Phones
          </p>
          <p className="text-light btn btn-link mt-2" onClick={() => cat(3)}>
            <TabletMacIcon /> Tabs
          </p>
          <p className="text-light btn btn-link mt-2" onClick={() => cat(4)}>
            <MouseIcon /> Accessory
          </p>
          <p className="text-light btn btn-link mt-2" onClick={() => cat(5)}>
            <SportsEsportsIcon /> Gaming
          </p>
        </div>
      )}
    </div>
  );
}
