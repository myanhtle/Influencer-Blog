import { Typography, Card, Grid } from "@material-ui/core";
import headerImage from "../images/forest.jpg";
import camilleImage from "../images/camille1.jpg";
import homePageStyles from "../styles/homePageStyles";
import headerImageStyles from "../styles/headerImageStyles";
import virgoImage from "../images/Virgo.png";
import musicImage from "../images/music.png";
import natureImage from "../images/nature.png";
import rooftopImage from "../images/rooftop.png";
function About() {
  const classes = homePageStyles();
  const header = headerImageStyles();

  return (
    <div className={classes.homepage}>
      <div className={header.headerImgContainer}>
        <img className={header.headerImg} src={headerImage} alt="Forest" />
      </div>
      <div className={header.headerTextContainer}>
        <Typography variant="h1" className={header.headerText}>
          <div>Its All About Camille!</div>
        </Typography>
      </div>

      <Grid container className={classes.bottomContainer}>
        <Grid item xs={12} md={6} className={classes.content}>
          <Card id="featured-blog-post" className={classes.content}>
            <div className={classes.imageContainer2}>
              <img src={camilleImage} alt="Camille Cooper" />
            </div>
            <Typography variant="h4">About Camille</Typography>
            <Typography>
              Camille is a recent college graduate from UVA currently traveling
              from city to city exploring what urban life offers while taking
              advantage of any opportunity to get back to the great outdoors.
              Educated as a chemical engineer, Camille threw that into the wind
              to pursue software development and adventure. Exclusively working
              for new start-ups as a freelancer, she has been able to have
              extended stays in NYC, Denver, SF, Seattle, and Barcelona. She
              hopes to go next to Austin or London, but, in truth, with her, you
              never know where she’ll be next. Known to be spontaneous and
              indecisive, Camille chose this life because it allows her to
              explore every option that life provides. She loves being a digital
              nomad because each new city brings new stories and opportunities.
              She never realized that documenting this way of life would garner
              such a large following for which she is grateful every day. Her
              goal is to promote adventures and positivity. One day she hopes to
              go to every national park. Her hobbies include hiking, climbing,
              yoga, snowboarding, and anything with music.
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} className={classes.content}>
          <Card className={classes.content}>
            <div className={classes.imageContainer}>
              <img src={rooftopImage} alt="City Rooftop" />
              <img src={virgoImage} alt="Virgo Sign" />
              <img src={natureImage} alt="Nature Symbol" />
              <img src={musicImage} alt="Music Icon" />
            </div>

            <Typography variant="h4">About Camille's Corner</Typography>
            <Typography>
              Camille’s Corner started back in the summer of 2019 when Camille
              first moved to NYC for an internship. Sitting behind a screen all
              day in the middle of a giant concrete jungle made her long for the
              proper outdoors. Hopelessly stuck between being drawn to the
              culture of cities and the allure of Mother Nature, Camille decided
              to bridge the two worlds through adventure and discovery, adopting
              a digital nomad life that took her across the country. The name of
              the blog comes from the corner in her room where Camille hung up
              tapestries that depicted beautiful landscapes juxtaposed against
              her Soho apartment. The goal of Camille’s Corner is to show others
              that in every city, nature offers an escape, and no one has to
              choose only one world.
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default About;
