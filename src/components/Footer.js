import footerStyles from "../styles/footerStyles";
import logo from "../images/logo_white.png";
import { Typography } from "@material-ui/core";

function Footer() {
  const classes = footerStyles();
  return (
    <div className={classes.footer}>
      <div className={classes.footerLeft}>
        <Typography variant="h4">Contact Camille</Typography>
        <Typography>email@email.com</Typography>
        <Typography>123 Sesame Street</Typography>
        <Typography>Charlottesville, VA 22903</Typography>
      </div>
      <div className={classes.footerCenter}>
        <Typography>Something to go here?</Typography>
      </div>

      <div className={classes.footerRight}>
        <img
          className={classes.footerImg}
          src={logo}
          alt="Camille's Corner Logo"
        />
        <Typography>Copyright 2021 Camille Cooper</Typography>
      </div>
    </div>
  );
}

export default Footer;
