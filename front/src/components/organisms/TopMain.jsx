import React from "react";
import { Link } from "react-router-dom";
import TopImage from "../../assets/img/TopImage.png";


import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Box } from "@material-ui/core";

import styles from "../../css/organisms/TopMain.module.css";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: '30px',
    paddingBottom: '20px',
    backgroundColor: 'rgba(190,184,245,0.5)',
    margin: '0 auto',
  },
  topImage: {
    marginBottom: '20px',
  },
  header: {
    marginBottom: '2rem',
  },
  button: {
    width: '200px',
  },
  box: {
    marginTop: "1rem"
  },
  link: {
    textDecoration: "none"
  },
}));

const TopMain = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <img className={`${styles.topImage}`} src={TopImage} alt="TopImage" /><br/>
        <Button className={classes.button} variant="contained">
          <Link to="/signin" className={classes.link}>
            ログインする
          </Link>
        </Button>
        <Box textAlign="center" className={classes.box}>
          <Typography>
            新規登録は &nbsp;
            <Link to="/signup" className={classes.link}>
              こちら
            </Link>
          </Typography>
        </Box>
      </div>
    </>
  )
};

export default TopMain;