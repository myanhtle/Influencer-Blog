import { Card, Button, Typography } from "@material-ui/core";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import firebase from "../configs/firebase";
import { useHistory } from "react-router-dom";
import { deleteAccount } from "../utils/loginUtils";

function AccountPage() {
  const { email, isAdmin, isLoggedIn } =
    useContext(UserContext);
  const user = useContext(UserContext);
  const history = useHistory();

  if (!isLoggedIn) {history.push("/login"); return null};

  return (
    <div style={{minHeight: "65vh"}}>
    <Card
      style={{
        width: "50vw",
        padding: "1rem",
        margin: "5vh auto 5vh auto",
      }}
    >
      <Typography variant="h6">Hello, {user.user.displayName}!</Typography>
      <br />
      <Typography>Name: {user.user.displayName}</Typography>
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
    </div>

  );
}

export default AccountPage;
