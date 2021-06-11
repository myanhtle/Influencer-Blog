import footerStyles from "../styles/footerStyles";
import logo from "../images/logo_white.png";
import { Typography } from "@material-ui/core";

function Footer() {
  const classes = footerStyles();
  return (
    <div className={classes.footer}>
      <div className={classes.footerLeft}>
        <Typography variant="h4">Contact Camille</Typography>
        <Typography><a href="mailto:camille@joinforge.co">camille@joinforge.co</a></Typography>
        <Typography><a href="https://instagram.com/camycoop" target="_blank" rel="noreferrer">@camycoop</a> on Instagram</Typography>
        <Typography>PO Box 21948</Typography>
        <Typography>Charlottesville, VA 22901</Typography>
      </div>


      <div className={classes.footerRight}>
        <img
          className={classes.footerImg}
          src={logo}
          alt="Camille's Corner Logo"
        />
        <Typography>Copyright 2021<br/>Camille Cooper</Typography>
      </div>
    </div>
  );
}

export default Footer;
