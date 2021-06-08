import { Typography, Button, Card, Grid } from "@material-ui/core";
import headerImage from "../images/homepage_image.png";
import homePageStyles from "../styles/homePageStyles";
import { useHistory } from "react-router-dom";

function HomePage() {
  const classes = homePageStyles();
  const history = useHistory();
  return (
    <div className={classes.homepage}>
      <div className={classes.headerImgContainer}>
        <img
          className={classes.headerImg}
          src={headerImage}
          alt="The Camille Connection"
        />
      </div>
      <div className={classes.welcomeTextContainer}>
        <Typography variant="h1" className={classes.welcomeText}>
          Welcome to <br /> Camille's Corner <br />
          <Button
            value="Go"
            onClick={() =>
              document.getElementById("featured-blog-post").scrollIntoView()
            }
          />
        </Typography>
      </div>
      <Grid container className={classes.bottomContainer}>
        <Grid item xs={9} className={classes.content}>
          <Card id="featured-blog-post" className={classes.content}>
            <Typography variant="h4">Featured Post</Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              risus quam, bibendum at arcu vitae, mattis cursus velit.
              Suspendisse ullamcorper nunc at eros luctus iaculis. Donec id
              neque commodo, posuere lacus a, accumsan massa. Proin in faucibus
              lacus, in pellentesque libero. Ut venenatis nunc a mauris
              hendrerit, vel efficitur nisl mattis. In ullamcorper, orci a
              finibus bibendum, mauris lacus feugiat neque, et congue nunc odio
              a nibh. Aliquam ut sagittis eros. Fusce finibus augue augue, id
              mollis justo porta in. Nam nec mauris pellentesque nulla
              scelerisque elementum. Vestibulum id massa varius, consequat
              turpis et, eleifend urna. Phasellus feugiat odio tortor. Ut ex
              magna, consectetur in lectus eget, pellentesque molestie erat.
              Vivamus vitae tempus nunc. Sed sit amet nibh ut felis hendrerit
              sagittis. Pellentesque quis vulputate purus. Suspendisse lacinia
              nibh sit amet magna volutpat mattis. Quisque eu nisi libero. Donec
              semper justo nulla, at maximus metus pellentesque sed. Praesent
              tempus mollis lobortis. Curabitur volutpat sem suscipit urna
              dignissim, tristique facilisis est hendrerit. Vivamus ac blandit
              massa. Aenean ullamcorper, sem in porta viverra, risus mi mollis
              leo, non rhoncus tortor elit ac lacus. Aliquam cursus dignissim
              magna quis tincidunt. In imperdiet rhoncus ex, vel maximus sapien.
              Nullam sodales diam et luctus gravida. Proin varius vulputate
              purus vel tincidunt. In tincidunt quam vitae tortor consequat
              volutpat. Donec facilisis at dui a placerat. Morbi convallis nunc
              quis iaculis ullamcorper. Etiam lacus nisi, lobortis eget pharetra
              quis, vehicula et ante. Nunc vel iaculis sem. Donec ultricies
              neque sapien, non consequat tellus efficitur ac. Integer mollis
              viverra mauris, nec porttitor felis dignissim nec. Quisque vel
              egestas felis. Aliquam erat volutpat. Nam ac porta augue. Quisque
              vitae semper magna. Etiam egestas rutrum commodo. Morbi lobortis
              placerat sapien id fringilla. Class aptent taciti sociosqu ad
              litora torquent per conubia nostra, per inceptos himenaeos. Donec
              ac ante eget magna mattis luctus. Mauris eros nisl, blandit at
              sodales ac, mattis ut nibh. Nullam justo neque, accumsan quis
              facilisis non, euismod at ligula. Nulla facilisi. Maecenas quis
              lobortis orci, sed imperdiet est. Etiam mollis urna et lorem
              eleifend elementum. Integer velit purus, venenatis quis sagittis
              eget, blandit imperdiet nulla. Aliquam et pharetra metus. Praesent
              purus ipsum, rhoncus nec sem non, iaculis blandit magna.
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={3} className={classes.content}>
          <Card className={classes.content}>
            <Typography variant="h4">About Camille</Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              risus quam, bibendum at arcu vitae, mattis cursus velit.
              Suspendisse ullamcorper nunc at eros luctus iaculis. Donec id
              neque commodo, posuere lacus a, accumsan massa. Proin in faucibus
              lacus, in pellentesque libero. Ut venenatis nunc a mauris
              hendrerit, vel efficitur nisl mattis. In ullamcorper, orci a
              finibus bibendum, mauris lacus feugiat neque, et congue nunc odio
              a nibh. Aliquam ut sagittis eros. Fusce finibus augue augue, id
              mollis justo porta in. Nam nec mauris pellentesque nulla
              scelerisque elementum.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/about")}
            >
              Learn more
            </Button>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage;
