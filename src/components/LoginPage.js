import { TextField, Button, Card, Typography } from "@material-ui/core";
import { useState } from "react";
import { useLoginStyles } from "../styles/loginStyles";
import { login, signup } from "../utils/loginUtils";

function LoginPage() {
  const [signUpActive, setSignUpActive] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const classes = useLoginStyles();

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

  return (
    <Card className={classes.loginCard}>
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
          autoComplete={signUpActive ? "new-password" : "current-password"}
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
    </Card>
  );
}

export default LoginPage;
