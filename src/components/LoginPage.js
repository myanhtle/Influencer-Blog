import { TextField, Button, Card, Typography } from "@material-ui/core";
import { useState } from "react";

function LoginPage() {
  const [signUpActive, setSignUpActive] = useState(false);

  return (
    <Card
      style={{
        margin: "auto",
        marginTop: "2rem",
        width: "25rem",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <Typography variant="h6">
        {signUpActive ? "Sign Up" : "Log In"}
      </Typography>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
        onSubmit={() => console.log(1)}
      >
        {signUpActive && <TextField label="Username" autoComplete="username" />}
        <TextField label="Email" autoComplete="email" />
        <TextField
          label="Password"
          type="password"
          autoComplete={signUpActive ? "new-password" : "current-password"}
        />
        {signUpActive && (
          <TextField
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
          />
        )}
        <div style={{ textAlign: "center" }}>
          <Button variant="contained" color="primary" style={{width: "75%"}}>
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
