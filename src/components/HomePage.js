import { Typography } from "@material-ui/core";
import headerImage from "../images/homepage_image.png";
import homePageStyles from "../styles/homePageStyles";

function HomePage() {
  const classes = homePageStyles();
  return (
    <div className="homepage">
      <div className={classes.headerImgContainer}>
        <img
          className={classes.headerImg}
          src={headerImage}
          alt="The Camille Connection"
        />
      </div>
      <div className={classes.welcomeTextContainer}>
        <Typography variant="h1" className={classes.welcomeText}>
          Welcome to <br /> Camille's Corner <br /> V
        </Typography>
      </div>
    </div>
  );
}

export default HomePage;
