import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@material-ui/core";

function ColorExamples() {
  return (
    <div>
      <br />
      <br />
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <Button variant="contained" color="secondary">
        Secondary
      </Button>
      <Button variant="contained">None</Button>
      <br />
      <br />
      <Button variant="outlined" color="primary">
        Primary
      </Button>
      <Button variant="outlined" color="secondary">
        Secondary
      </Button>
      <Button variant="outlined">None</Button>
      <br />
      <br />
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button>None</Button>
      <br />
      <br />
      <Card
        style={{
          width: "50%",
          height: "auto",
          textAlign: "left",
          margin: "auto",
        }}
      >
        <CardContent>
          <Typography variant="h6">Test Card</Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          at dignissim justo, a rutrum augue. Etiam volutpat eros et scelerisque
          rutrum. Donec suscipit justo ex, id pretium nunc tincidunt eu.
        </CardContent>
        <CardActions>
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button>None</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default ColorExamples;