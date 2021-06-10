import React from "react";
import { Card, Grid } from "@material-ui/core";
import musicPageStyles from "../../styles/musicStyles";

export default function Playlists() {
  const classes = musicPageStyles();
  return (
    <Grid container className={classes.bottomContainer}>
      <Grid item xs={4} className={classes.content}>
        <Card
          id="playlist1"
          className={classes.content}
          style={{ backgroundColor: "#9CB380" }}
        >
          <iframe
            src="https://open.spotify.com/embed/playlist/02dzpfOZZLZIPwzTQwh1Dd"
            width="100%"
            height="380"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
        </Card>
      </Grid>
      <Grid item xs={4} className={classes.content}>
        <Card
          id="playlist2"
          className={classes.content}
          style={{ backgroundColor: "#9CB380" }}
        >
          <iframe
            src="https://open.spotify.com/embed/playlist/1IKHaTUWouy4r3xb8itXQs"
            width="100%"
            height="380"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
        </Card>
      </Grid>
      <Grid item xs={4} className={classes.content}>
        <Card
          id="playlist3"
          className={classes.content}
          style={{ backgroundColor: "#9CB380" }}
        >
          <iframe
            src="https://open.spotify.com/embed/playlist/0AhcIQykS43A81YehdzJOv"
            width="100%"
            height="380"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
        </Card>
      </Grid>
      <Grid item xs={4} className={classes.content}>
        <Card
          id="playlist4"
          className={classes.content}
          style={{ backgroundColor: "#9CB380" }}
        >
          <iframe
            src="https://open.spotify.com/embed/playlist/2PxwQAPCtwSKKHfLkQM60A"
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
