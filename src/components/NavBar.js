import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function NavBar() {
  const history = useHistory();
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
          onClick={() => history.push("/login")}
          variant="contained"
          color="secondary"
        >
          Log In
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
