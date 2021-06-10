import { Typography, Button, Card, Grid } from "@material-ui/core";
import headerImage from "../images/homepage_image.png";
import homePageStyles from "../styles/homePageStyles";
import { useHistory } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import logo from "../images/logo_white.png";
import { useEffect, useState } from "react";

function HomePage() {
  const classes = homePageStyles();
  const history = useHistory();
  const [blogPosts, setBlogPosts] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/blog/read")
      .then((res) => res.json())
      .then((res) => setBlogPosts(res));
  }, []);
  console.log(blogPosts);

  return (
    <div className={classes.homepage}>

      {/* Header Image */}
      <div className={classes.headerImgContainer}>
        <img
          className={classes.headerImg}
          src={headerImage}
          alt="The Camille Connection"
        />
      </div>
      
      {/* Header Text */}
      <div className={classes.welcomeTextContainer}>
        <Typography variant="h1" className={classes.welcomeText}>
          <div>
            <img
              src={logo}
              className={classes.bigLogo}
              alt="Camille's Corner Logo"
            />
            <br />
            Welcome
            <br />
            <Button
              onClick={() =>
                document.getElementById("featured-blog-post").scrollIntoView()
              }
            >
              <ExpandMoreIcon className={classes.expandIcon} />
            </Button>
          </div>
        </Typography>
      </div>

      {/* Page Content */}
      <Grid container className={classes.bottomContainer}>
        {/* Most Recent Blog Post */}
        <Grid item xs={9} className={classes.content}>
          <Card id="featured-blog-post" className={classes.content}>
            <Typography variant="h5">Latest Post</Typography>
            <br />
            {blogPosts && (
              <>
                <Typography variant="h4">
                  {blogPosts[blogPosts.length - 1].title}
                </Typography>
                <Typography variant="h6">{blogPosts[blogPosts.length - 1].date}</Typography>
                <br />
                <Typography>
                  {blogPosts[blogPosts.length - 1].messageContent}
                </Typography>
              </>
            )}
          </Card>
        </Grid>

        {/* About Text */}
        <Grid item xs={3} className={classes.content}>
          <Card className={classes.content}>
            <Typography variant="h4">About Camille</Typography>
            <br />
            <Typography>
              Camille is a recent college graduate from UVA currently traveling
              from city to city exploring what urban life offers while taking
              advantage of any opportunity to get back to the great outdoors.
              <br /> <br />
              The goal of Camille’s Corner is to show others that in every city,
              nature offers an escape, and no one has to choose only one world.
            </Typography>
            <br />
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
