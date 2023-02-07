import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Divider, Box } from "@material-ui/core";

import styles from "../../css/organisms/TopBottom.module.css"

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: '30px',
    paddingBottom: '20px',
    backgroundColor: '#F2F2F2',
    margin: '0 auto',
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
  footer: {
    display: 'inline-block',
    textAlign: 'center',
  },
  footerContent: {
    margin: '70px auto 10px',
    display: 'flex',
    gap: '30px',
  },
  divider: {
    width: '90%',
    margin: '0 auto 10px',
  },
  buttonLink: {
    textDecoration: "none",
    color: 'white'
  },
}));

const TopBottom = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <Typography className={`${styles.title}`} variant="h5">さぁ、あなたらしい絵を描こう！</Typography> 
        <Button className={classes.button} color="primary" variant="contained">
          <Link to="/signin" className={classes.buttonLink}>
            ログインして始める
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
        <footer className={classes.footer}>
          <div className={`${styles.footerContent}`}>
            <Typography>
              <Link to="#" className={classes.link}>
                利用規約
              </Link>
            </Typography>
            <Typography>
              <Link to="#" className={classes.link}>
                プライバシーポリシー
              </Link>
            </Typography>
            <Typography>
              <Link to="#" className={classes.link}>
                お問い合せ
              </Link>
            </Typography>
          </div>
        </footer>
        <Divider className={classes.divider} />
        <Typography>
          ©︎ 画HACK
        </Typography>
      </div>
    </>
  )
};

export default TopBottom;