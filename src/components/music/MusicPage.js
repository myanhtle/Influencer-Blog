import { Typography, Button, Card, Grid, ButtonGroup } from "@material-ui/core";
import { useState, useEffect } from "react";
import Playlists from "./Playlist";
import Albums from "./Albums";
import headerImage from "../../images/musicpageimg.jpg";
import musicPageStyles from "../../styles/musicStyles";
import CircularProgress from "@material-ui/core/CircularProgress";

function HomePage() {
  const classes = musicPageStyles();
  const header = headerImageStyles();
  const [showPlaylist, setShowPlaylist] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [loading]);

  const handleShowPlaylist = (event) => {
    event.preventDefault();
    setLoading(true);
    setShowPlaylist(true);
  };

  const handleShowAlbums = (event) => {
    event.preventDefault();
    setLoading(true);
    setShowPlaylist(false);
  };
 
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
      <div className={classes.subHeading}>
        <ButtonGroup>
          <Button
            variant="contained"
            color="primary"
            onClick={handleShowPlaylist}
          >
            My Playlists
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleShowAlbums}
          >
            Favorite Albums
          </Button>
        </ButtonGroup>
      </div>
      {loading ? (
        <div className={classes.subHeading} style={{ padding: "5%" }}>
          <CircularProgress />
        </div>
      ) : (
        <>{showPlaylist && !loading ? <Playlists /> : <Albums />}</>
      )}
    </div>
  );
}

export default HomePage;
