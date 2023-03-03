import React from "react";
import { Link } from "react-router-dom";
import TopBackImage from "../../assets/img/TopBackImage.png";
import TopImage from "../../assets/img/TopImage.png";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Box } from "@material-ui/core";
import styles from "../../css/organisms/TopMain.module.css";
import GuestLoginButton from "../atoms/buttons/GuestLoginButton";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: `url(${TopBackImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    margin: '10px auto',
    paddingBottom: '20px'
  },
  topImage: {
    marginBottom: '20px',
  },
  header: {
    marginBottom: '2rem',
  },
  text: {
    margin: '5px 0'
  },
  box: {
    marginTop: "1rem"
  },
  buttonLink: {
    textDecoration: "none",
    color: 'white'
  },
  link: {
    textDecoration: "none",
  },
}));

const TopMain = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <div className={classes.container}>
          <img className={`${styles.topImage}`} src={TopImage} alt="TopImage" /><br/>
          <Button className={classes.button} color="primary" variant="contained">
            <Link to="/signin" className={classes.buttonLink}>
              ログインする
            </Link>
          </Button>
          <Typography className={classes.text}>or</Typography>
          <GuestLoginButton />
          <Box textAlign="center" className={classes.box}>
            <Typography>
              新規登録は &nbsp;
              <Link to="/signup" className={classes.link}>
                こちら
              </Link>
            </Typography>
          </Box>
        </div>
      </div>
    </>
  )
};

export default TopMain;
