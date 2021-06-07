import { Card, CardContent, Typography } from "@material-ui/core";

function ErrorPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "centers",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Card style={{ width: "50vw", textAlign: "center" }}>
        <CardContent>
          <Typography variant="h6">Sorry, page not found.</Typography>
          <Typography>
            Please check your URL or go <a href="/">home</a>.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default ErrorPage;
