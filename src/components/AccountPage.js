import {Card, Button, Typography} from "@material-ui/core"
import {useContext} from "react"
import {UserContext} from "../contexts/UserContext"
import firebase from "../configs/firebase"
import {useHistory} from "react-router-dom"
import {deleteAccount} from "../utils/loginUtils"

function AccountPage () {
  const {username, email, isAdmin, isLoggedIn} = useContext(UserContext)
  const history = useHistory();

  if (!isLoggedIn) history.push("/login")

  return (<Card style={{width: "25vw", padding: "1rem", margin: "auto", marginTop: "1rem"}}>
    <Typography variant="h6">Hello, {username}!</Typography>
    <Typography>Email: {email}</Typography>
    <Typography>{isAdmin? "Admin" : "User"}</Typography>
    <Button variant="contained" onClick={() => firebase.auth().signOut()}>Log Out</Button>
    <Button variant="outlined" onClick={() => deleteAccount()}>Delete Account</Button>
  </Card>)
}

export default AccountPage;