import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import axios from "axios";
const api = axios.create({
  baseURL: `http://localhost:8080/`,
});
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },

  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Admin(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const admin = useSelector((state) => state.posts.admin);
  let history = useHistory();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/api/user").then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  }, []);

  const AdminPage = (e) => {
    e === 0 && history.push("/admin/all-users");
    e === 1 && history.push("/admin/all-sellers");
    e === 2 && history.push("/admin/all-products");
    e === 3 && history.push("/admin/all-shops");
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {["All users", "All sellers", "All products", "All shops"].map(
          (text, index) => (
            <ListItem button key={text} onClick={() => AdminPage(index)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
    </div>
  );

  const del = (e) => {
    alert(e);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      {!admin && history.push("/")}
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          <table class="table table-hover table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                <th scope="col">Registered date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((m, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{m.Email}</td>
                  <td>{m.Password}</td>
                  <td>{m.date}</td>
                  <td>
                    <i
                      class="fa fa-trash"
                      aria-hidden="true"
                      onClick={() => del(m._id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Typography>
      </main>
    </div>
  );
}

export default Admin;
