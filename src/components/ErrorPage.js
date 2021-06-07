import { Card, CardContent, Typography } from "@material-ui/core";

function ErrorPage() {
  return (
    <div>
      <Card style={{ width: "50vw", margin: "auto", marginTop: "2%" }}>
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
