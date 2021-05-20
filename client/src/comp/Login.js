import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import GoogleLogin from "react-google-login";
import Icon from "@material-ui/core/Icon";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { UserId, UserName, UserStatus } from "../actions/postAction";

const api = axios.create({
  baseURL: `http://localhost:8080/`,
});
const useStyles = makeStyles((theme) => ({
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

  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "24.6ch",
  },
}));

export default function Login(props) {
  const id = useSelector((state) => state.posts.id);
  const dispatch = useDispatch();
  let history = useHistory();
  useEffect(() => {
    if (props.match.params.id === "1") {
      setTypeX("Buyer");
    }
    if (props.match.params.id === "2") {
      setTypeX("Seller");
    }
  }, [props.match.params.id]);
  const classes = useStyles();

  const [typeX, setTypeX] = React.useState("");
  const [err, setErr] = React.useState("");
  const [err2, setErr2] = React.useState("");
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
    email: "",
    Remail: "",
    Rpassword: "",
    Rname: "",
    SAddr: "",
    Sname: "",
    img: "",
    Number: "",
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //login user
  const showx = () => {
    var mailformat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!values.email.match(mailformat)) {
      setErr2("Invalid email address");
      return;
    }
    const data = {
      Email: values.email,
      pwd: values.password,
    };

    if (values.email === "admin@admin.com" && values.password === "admin123") {
      dispatch({ type: "ADMIN", payload: "admin@admin123" });
      history.push("/admin/all-shops");
    }

    if (props.match.params.id === "1") {
      api.post("/api/user/login", data).then((res) => {
        if (res.data === 0) {
          setErr2("No user found.");
        } else if (res.data === 1) {
          setErr2("Wrong credentials entered.");
        } else {
          dispatch(UserId(res.data._id));
          if (res.data.status === "1") {
            dispatch(UserName(res.data.User_Name));
          } else {
            dispatch(UserName(res.data.Shop_Name));
          }
          dispatch(UserStatus(res.data.status));

          history.push("/");
        }
      });
    } else if (props.match.params.id === "2") {
      api.post("/api/user/Seller_login", data).then((res) => {
        if (res.data === 0) {
          setErr2("No user found.");
        } else if (res.data === 1) {
          setErr2("Wrong credentials entered.");
        } else {
          dispatch(UserId(res.data._id));
          if (res.data.status === "1") {
            dispatch(UserName(res.data.User_Name));
          } else {
            dispatch(UserName(res.data.Shop_Name));
          }
          dispatch(UserStatus(res.data.status));
          history.push("/");
        }
      });
    }
  };
  const imx = (event) => {
    setValues({
      ...values,
      img: event.target.files[0],
    });
  };

  //Register user
  const showR = () => {
    var mailformat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!values.Remail.match(mailformat)) {
      setErr("Email not valid");
      setValues({
        ...values,
        Remail: "",
      });
      return;
    }

    if (props.match.params.id === "1") {
      if (
        values.Remail === "" ||
        values.Rname === "" ||
        values.Rpassword === ""
      ) {
        setErr("All fields are required");
        return;
      }
      const data = {
        Email: values.Remail,
        pwd: values.Rpassword,
        name: values.Rname,
        status: props.match.params.id,
      };
      api.post("/api/user/add", data).then((res) => {
        console.log(res.data.User_Name);
        if (res.data === 0) {
          setErr("Email is already registered.");
        } else {
          dispatch(UserId(res.data._id));
          dispatch(UserName(res.data.User_Name));
          dispatch(UserStatus(res.data.status));
          history.push("/");
        }
      });
    } else if (props.match.params.id === "2") {
      console.log("1");
      if (
        values.Remail === "" ||
        values.Sname === "" ||
        values.Rpassword === "" ||
        values.SAddr === "" ||
        values.img === "" ||
        values.Number === ""
      ) {
        setErr("All fields are required");
        return;
      }
      const formData = new FormData();
      formData.append("file", values.img);
      formData.append("Email", values.Remail);
      formData.append("ShopName", values.Sname);
      formData.append("ShopAddress", values.SAddr);
      formData.append("Pwd", values.Rpassword);
      formData.append("Number", values.Number);
      api
        .post("/uploadSeller", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data === 0) {
            setErr("Email is already registered.");
          } else if (res.data._id) {
            dispatch(UserId(res.data._id));
            dispatch(UserName(res.data.Shop_Name));
            dispatch(UserStatus(res.data.status));
            history.push("/");
          }
        });
    }
  };

  const rg = (response) => {
    dispatch(UserId(response.profileObj.googleId));
    dispatch(UserName(response.profileObj.name));
    dispatch(UserStatus("1"));
    history.push("/");
  };
  return (
    <div className="container">
      {id && history.push("/")}
      {sessionStorage.getItem("id") && <Redirect to="/" />}

      <div className="alert alert-primary mt-5" role="alert">
        <Link to="/">Home</Link> / Sign in / {typeX}
      </div>

      <br />
      <br />
      <h1 style={{ marginLeft: "266px" }}>Login Page For {typeX}</h1>
      <hr />
      <div className="row justify-content-around">
        <div className="col-lg-4 col-12">
          <h1>Login</h1>
          <br />
          <br />
          <TextField
            id="standard-basic"
            label="Email"
            type="email"
            variant="outlined"
            value={values.email}
            onChange={handleChange("email")}
          />

          <br />
          <br />
          <FormControl className={clsx(classes.textField)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>

          <br />
          <br />

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<Icon>send</Icon>}
            onClick={showx}
          >
            Login
          </Button>

          <hr className="d-lg-block d-none" />

          {props.match.params.id === "1" && (
            <div>
              <h4 className="mt-3">OR</h4>

              <GoogleLogin
                className="mt-3"
                clientId="125390506364-593akvskil0cmo625m1v16kll7avbgdv.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={rg}
                onFailure={rg}
                cookiePolicy={"single_host_origin"}
                theme="dark"
              />
            </div>
          )}
          {err2 && (
            <div className="alert alert-danger mt-5" role="alert">
              {err2}
            </div>
          )}
          <hr className="d-block d-lg-none" />
        </div>

        <div
          style={{ width: 1, backgroundColor: "black" }}
          className="d-lg-block d-none"
        ></div>

        <div className="col-lg-6">
          <h1>Create new account</h1>

          <br />
          <TextField
            id="standard-basic2"
            label="Email"
            variant="outlined"
            value={values.Remail}
            onChange={handleChange("Remail")}
          />

          {props.match.params.id === "1" && (
            <div>
              <br />
              <br />
              <TextField
                id="standard-basic2"
                label="User Name"
                type="name"
                variant="outlined"
                value={values.Rname}
                onChange={handleChange("Rname")}
              />
            </div>
          )}
          <br />
          <br />

          {props.match.params.id === "2" && (
            <div>
              <TextField
                id="standard-basic2"
                label="Phone Number"
                variant="outlined"
                value={values.Number}
                onChange={handleChange("Number")}
              />
              <br />
              <br />
              <TextField
                id="standard-basic2"
                label="Shop Name"
                type="name"
                variant="outlined"
                value={values.Sname}
                onChange={handleChange("Sname")}
              />
              <br />
              <br />
              <TextField
                id="standard-basic2"
                label="Shop Address"
                type="name"
                variant="outlined"
                value={values.SAddr}
                onChange={handleChange("SAddr")}
              />
              <br />
              <br />
            </div>
          )}

          <FormControl className={clsx(classes.textField)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password2"
              type={values.showPassword ? "text" : "password"}
              value={values.Rpassword}
              onChange={handleChange("Rpassword")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>

          {props.match.params.id === "2" && (
            <div>
              <br />
              <p>Upload shop image</p>
              <input
                type="file"
                className="form-control-file"
                id="exampleFormControlFile1"
                onChange={imx}
                name="img"
              />
            </div>
          )}

          <br />
          <br />

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<Icon>send</Icon>}
            onClick={showR}
          >
            Register
          </Button>
          {err && (
            <div className="alert alert-danger mt-5" role="alert">
              {err}
            </div>
          )}
        </div>
      </div>
      <br />
      <hr />
    </div>
  );
}
