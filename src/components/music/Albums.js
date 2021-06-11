import React from "react";
import { Card, Grid } from "@material-ui/core";
import musicPageStyles from "../../styles/musicStyles";

export default function Albums() {
  const classes = musicPageStyles();
  return (
    <Grid container className={classes.bottomContainer}>
      <Grid item xs={12} md={4} className={classes.content}>
        <Card
          id="album1"
          className={classes.content}
          style={{ backgroundColor: "#9CB380" }}
        >
          <iframe
            title="Top tracks for Crosby"
            src="https://open.spotify.com/embed/artist/1CYsQCypByMVgnv17qsSbQ"
            width="100%"
            height="380"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
        </Card>
      </Grid>
      <Grid item xs={12} md={4} className={classes.content}>
        <Card
          id="album2"
          className={classes.content}
          style={{ backgroundColor: "#9CB380" }}
        >
          <iframe
            title="Mt. Joy"
            src="https://open.spotify.com/embed/album/5h9FO7QRZMcrcnSYvihQ01"
            width="100%"
            height="380"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
        </Card>
      </Grid>
      <Grid item xs={12} md={4} className={classes.content}>
        <Card
          id="album3"
          className={classes.content}
          style={{ backgroundColor: "#9CB380" }}
        >
          <iframe
            title="Gather Me"
            src="https://open.spotify.com/embed/album/5THcElsOkPsIopiOQj18An"
            width="100%"
            height="380"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
        </Card>
      </Grid>
      <Grid item xs={12} md={4} className={classes.content}>
        <Card
          id="album4"
          className={classes.content}
          style={{ backgroundColor: "#9CB380" }}
        >
          <iframe
            title="Blood on the Tracks"
            src="https://open.spotify.com/embed/album/4WD4pslu83FF6oMa1e19mF"
            width="100%"
            height="380"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
        </Card>
      </Grid>
      <Grid item xs={12} md={4} className={classes.content}>
        <Card
          id="album5"
          className={classes.content}
          style={{ backgroundColor: "#9CB380" }}
        >
          <iframe
            title="The Dark Side of the Moon"
            src="https://open.spotify.com/embed/album/4LH4d3cOWNNsVw41Gqt2kv"
            width="100%"
            height="380"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
        </Card>
      </Grid>
    </Grid>
  );
}
