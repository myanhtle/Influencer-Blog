import { Card, Button, Typography } from "@material-ui/core";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import firebase from "../configs/firebase";
import { useHistory } from "react-router-dom";
import { deleteAccount } from "../utils/loginUtils";

function AccountPage() {
  const { username, email, fullName, isAdmin, isLoggedIn } =
    useContext(UserContext);
  const history = useHistory();

  if (!isLoggedIn) history.push("/login");

  return (
    <Card
      style={{
        width: "25vw",
        padding: "1rem",
        margin: "5vh auto 5vh auto",
      }}
    >
      <Typography variant="h6">Hello, {username}!</Typography>
      <br />
      <Typography>Name: {fullName}</Typography>
      <Typography>Email: {email}</Typography>
      <Typography>{isAdmin ? "Admin" : "User"}</Typography>
      <br />
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Button variant="contained" onClick={() => firebase.auth().signOut()}>
          Log Out
        </Button>
        <Button variant="outlined" onClick={() => deleteAccount()}>
          Delete Account
        </Button>
      </div>
    </Card>
  );
}

export default AccountPage;
