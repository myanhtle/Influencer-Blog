import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useContext } from "react"
import {UserContext} from "../contexts/UserContext"

function NavBar() {
  const history = useHistory();
  const {isLoggedIn} = useContext(UserContext);

  return (
    <AppBar position="static">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">Blog Title</Typography>
        <div>
          <Button onClick={() => history.push("/")}>Home</Button>
          <Button onClick={() => history.push("/about")}>About</Button>
          <Button onClick={() => history.push("/blog")}>Blog</Button>
          <Button onClick={() => history.push("/forum")}>Forum</Button>
          <Button onClick={() => history.push("/color-examples")}>
            Colors
          </Button>
        </div>
        <Button
          onClick={() => history.push(isLoggedIn? "/account" : "/login")}
          variant="contained"
          color="secondary"
        >
          {isLoggedIn? "My Account" : "Log In"}
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
