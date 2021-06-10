import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Hidden,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import logo from "../images/logo_white.png";
import navBarStyles from "../styles/navBarStyles";
import LocalMallIcon from "@material-ui/icons/LocalMall";

function NavBar() {
  const history = useHistory();
  const { isLoggedIn } = useContext(UserContext);
  const classes = navBarStyles();
  const [menuOpen, setMenuOpen] = useState(false);
  const routes = [
    { name: "Home", route: "/" },
    { name: "About", route: "/about" },
    { name: "Blog", route: "/blog" },
    { name: "Forum", route: "/forum" },
    { name: "Shop", route: "/shop" },
  ];

  return (
    <AppBar position="static">
      <Toolbar className={classes.navbdar}>
        <Typography variant="h4" className={classes.siteName}>
          <img
            src={logo}
            style={{ maxHeight: "90%", marginRight: "1rem" }}
            alt="Camille's Corner Logo"
          />
          <Hidden mdDown>Camille's Corner</Hidden>
        </Typography>
        <div className={classes.navButtonsContainer}>
          <Button onClick={() => history.push("/")}>Home</Button>
          <Button onClick={() => history.push("/about")}>About</Button>
          <Button onClick={() => history.push("/blog")}>Blog</Button>
          <Button onClick={() => history.push("/forum")}>Forum</Button>
          <Button onClick={() => history.push("/music")}>Music</Button>
          <Button onClick={() => history.push("/shop")}>Shop</Button>
          <Button onClick={() => history.push("/color-examples")}>
            Colors
          </Button>
          <Button
            className={classes.cart}
            onClick={() => history.push("/cart")}
          >
            <LocalMallIcon />
            <span className={classes.cartCount}>5</span>
          </Button>
        </div>

        {/* <Hidden mdDown>
          <div className={classes.navButtonsContainer}>
            {routes.map((route) => {
              return (
                <Button
                  onClick={() => history.push(route.route)}
                  key={route.name}
                >
                  {route.name}
                </Button>
              );
            })}
          </div>
        </Hidden>

        <Hidden mdUp>
          <Button
            onClick={(e) => setMenuOpen(e.currentTarget)}
            id="menuButton"
            style={{ color: "white" }}
          >
            <MenuIcon />
          </Button>

          <Menu
            className={classes.navDropdown}
            anchorEl={menuOpen}
            keepMounted
            open={Boolean(menuOpen)}
            onClose={() => setMenuOpen(false)}
          >
            {routes.map((route) => {
              return (
                <MenuItem
                  onClick={() => {
                    history.push(route.route);
                    setMenuOpen(false);
                  }}
                  key={route.name}
                >
                  {route.name}
                </MenuItem>
              );
            })}
          </Menu>
        </Hidden> */}
        <div className={classes.loginButtonContainer}>
          <Button
            onClick={() => history.push(isLoggedIn ? "/account" : "/login")}
            variant="contained"
            color="secondary"
          >
            {isLoggedIn ? "My Account" : "Log In"}
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
