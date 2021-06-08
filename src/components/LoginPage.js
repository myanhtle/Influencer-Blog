import {
  TextField,
  Button,
  Card,
  Typography,
  Grid,
  CardContent,
} from "@material-ui/core";
import { useState } from "react";
import { useLoginStyles } from "../styles/loginStyles";
import { login, signup } from "../utils/loginUtils";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";

function LoginPage() {
  const [signUpActive, setSignUpActive] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const classes = useLoginStyles();
  const { isLoggedIn } = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signUpActive) {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
      } else {
        signup(username, email, password).then((success) => {
          success ? alert("Account created.") : alert("Account not created");
        });
      }
    } else {
      login(email, password).then((success) => {
        success ? alert("Logged in.") : alert("Not logged in.");
      });
    }
  };

  if (isLoggedIn) history.push("/account");
  return (
    <Card className={classes.loginCard}>
      <Grid container className={classes.loginGrid}>
        <Grid item xs={7} className={classes.loginActions}>
          Content to go here later
        </Grid>
        <Grid item xs={5}>
          <CardContent className={classes.loginActions}>
            <Typography variant="h6">
              {signUpActive ? "Sign Up" : "Log In"}
            </Typography>

            <form className={classes.loginForm} onSubmit={handleSubmit}>
              {signUpActive && (
                <TextField
                  label="Username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              )}

              <TextField
                label="Email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                label="Password"
                type="password"
                autoComplete={
                  signUpActive ? "new-password" : "current-password"
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {signUpActive && (
                <TextField
                  label="Confirm Password"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              )}

              <div style={{ textAlign: "center" }}>
                <Button variant="contained" color="primary" type="submit">
                  {signUpActive ? "Sign Up" : "Log In"}
                </Button>

                <Typography style={{ padding: ".5rem" }}>or</Typography>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setSignUpActive((current) => !current)}
                >
                  {signUpActive ? "Log In" : "Sign Up"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

export default LoginPage;
