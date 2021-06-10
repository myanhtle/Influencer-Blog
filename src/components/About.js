import { Typography, Card, Grid, CardMedia, CardActionArea } from "@material-ui/core";
import headerImage from "../images/forest.jpg";
import camilleImage from "../images/camille1.jpg";
import homePageStyles from "../styles/homePageStyles";
import headerImageStyles from "../styles/headerImageStyles";

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
        <Grid item xs={12} lg={9} className={classes.content}>
          <Card id="featured-blog-post" className={classes.content}>
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
            <br />
            <Typography variant="h4">About Camille Cooper</Typography>
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
            <br />
            <Typography variant="h4">Fun Facts</Typography>
            <Typography>
              <ul>
                <li>Camille is a Virgo Libra</li>
                <li>
                  Her favorite parts of nature are trees, mountains, and rivers
                </li>
                <li>Her favorite parts of cities are music and rooftops</li>
              </ul>
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} lg={3} className={classes.content}>
          <Card className={classes.content}>
            Image to go here
            {/* <CardActionArea>
            <CardMedia image={"../images/camille1.jpg"} style={{height: "500px"}}/>

            </CardActionArea> */}
            
            {/* <div className={classes.headerImgContainer}>
              <img
                // className={classes.headerImg}
                src={camilleImage}
                alt="The Camille Connection"
              />
            </div> */}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default About;
