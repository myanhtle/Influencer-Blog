import { Typography, Button, Card, Grid } from "@material-ui/core";
import headerImage from "../../images/musicpageimg.jpg";
import musicPageStyles from "../../styles/musicStyles";
import headerImageStyles from "../../styles/headerImageStyles";

function HomePage() {
  const classes = musicPageStyles();
  const header = headerImageStyles();

  return (
    <div>
      <div className={header.headerImgContainer}>
        <img className={header.headerImg} src={headerImage} alt="Music" />
      </div>
      <div className={header.headerTextContainer}>
        <Typography variant="h1" className={header.headerText}>
          <div>Jam with Cam!</div>
        </Typography>
      </div>
      <div className={classes.subHeading}>
        On the road or just wanting to relax? Listen along to my favorite
        playlists
      </div>
      <Grid container className={classes.bottomContainer}>
        <Grid item lg={4} sm={6} xs={12} className={classes.content}>
          <Card
            id="playlist1"
            className={classes.content}
            style={{ backgroundColor: "#9CB380" }}
          >
            <iframe
              src="https://open.spotify.com/embed/album/7bYichzvtYHdjF8HF69dyA"
              width="100%"
              height="380"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
            ></iframe>
          </Card>
        </Grid>
        <Grid item lg={4} sm={6} xs={12} className={classes.content}>
          <Card
            id="playlist2"
            className={classes.content}
            style={{ backgroundColor: "#9CB380" }}
          >
            <iframe
              src="https://open.spotify.com/embed/playlist/0PUVrDKbN0Mlk30FFxc0Is"
              width="100%"
              height="380"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
            ></iframe>
          </Card>
        </Grid>
        <Grid item lg={4} sm={6} xs={12} className={classes.content}>
          <Card
            id="playlist3"
            className={classes.content}
            style={{ backgroundColor: "#9CB380" }}
          >
            <iframe
              src="https://open.spotify.com/embed/album/7fRrTyKvE4Skh93v97gtcU"
              width="100%"
              height="380"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
            ></iframe>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage;
