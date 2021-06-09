import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import logo from "../images/logo_white.png";
import navBarStyles from "../styles/navBarStyles";

function NavBar() {
  const history = useHistory();
  const { isLoggedIn } = useContext(UserContext);
  const classes = navBarStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.navbar}>
        <Typography variant="h4" className={classes.siteName}>
          <img
            src={logo}
            style={{ maxHeight: "90%", marginRight: "1rem" }}
            alt="Camille's Corner Logo"
          />
          Camille's Corner
        </Typography>
        <div className={classes.navButtonsContainer}>
          <Button variant="outlined" onClick={() => history.push("/")}>
            Home
          </Button>
          <Button onClick={() => history.push("/about")}>About</Button>
          <Button onClick={() => history.push("/blog")}>Blog</Button>
          <Button onClick={() => history.push("/forum")}>Forum</Button>
          <Button onClick={() => history.push("/color-examples")}>
            Colors
          </Button>
        </div>
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
