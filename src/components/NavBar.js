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
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import logo from "../images/logo_white.png";
import navBarStyles from "../styles/navBarStyles";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

function NavBar() {
  const history = useHistory();
  const { isLoggedIn } = useContext(UserContext);
  const { username } = useContext(UserContext);
  const classes = navBarStyles();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState([]);
  const routes = [
    { name: "Home", route: "/" },
    { name: "About", route: "/about" },
    { name: "Blog", route: "/blog" },
    { name: "Forum", route: "/forum" },
    { name: "Music", route: "/music" },
    { name: "Shop", route: "/shop" },
  ];
  const fetchUserCart = () => {
    fetch(`http://localhost:8080/cart/read/${username}`)
      .then((res) => res.json())
      .then((data) => setCart(data));
    console.log("cart");
    console.log(cart);
    calcCount();
    console.log(cartCount);
  };
  const calcCount = () => {
    console.log("calculating");
    var count = 0;
    for (var i = 0; i < cart.length; i++) {
      count++;
    }
    setCartCount(count);
  };
  useEffect(() => {
    console.log("ohohoh");
    fetchUserCart();
  }, []);
  return (
    <AppBar position="static">
      <Toolbar className={classes.navbar}>
        <Typography variant="h4" className={classes.siteName}>
          <img
            src={logo}
            style={{ maxHeight: "90%", marginRight: "1rem" }}
            alt="Camille's Corner Logo"
          />
          <Hidden mdDown>Camille's Corner</Hidden>
        </Typography>

        <Hidden smDown>
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
        </Hidden>
        <div className={classes.loginButtonContainer}>
          <Button
            className={classes.cart}
            onClick={() => history.push("/cart")}
          >
            <p className={classes.cartCount}>{cartCount}</p>
            <LocalMallIcon />
          </Button>
          <Button
            onClick={() => history.push(isLoggedIn ? "/account" : "/login")}
            // variant="contained"
            // color="secondary"
            style={{ color: "white" }}
          >
            <AccountBoxIcon />
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
