import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Divider, Box } from "@material-ui/core";

import GuestLoginButton from "../atoms/buttons/GuestLoginButton";
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
  text: {
    margin: '5px 0'
  },
  box: {
    marginTop: "1rem"
  },
  link: {
    textDecoration: "none",
    color: 'blue',
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

function TopBottom() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
        <Typography className={`${styles.title}`} variant="h5">あなたも「画伯」になろうよ！</Typography> 
        <Button className={classes.button} color="primary" variant="contained">
          <Link to="/signin" className={classes.buttonLink}>
            ログインして始める
          </Link>
        </Button>
        <Typography className={classes.text} >or</Typography>
        <GuestLoginButton />
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
            <Button>
              <Link to="/termsofservice" className={classes.link}>
                利用規約
              </Link>
            </Button>
            <Button>
              <Link to="/privacypolicy" className={classes.link}>
                プライバシーポリシー
              </Link>
            </Button>
            <Typography>
              <Button
                href="https://docs.google.com/forms/d/e/1FAIpQLSfCMtaGohmoBIkGxkb8hPseJ9wLFDFzPp3NFZv1kToFH-ge6w/viewform?usp=sf_link" 
                target="_blank"
                className={classes.link}>
                お問い合せ
              </Button>
            </Typography>
          </div>
        </footer>
        <Divider className={classes.divider} />
        <p className={`${styles.copyRight}`}>
          Copyright © 2023 - All right reserved by Yuuki Oose
        </p>
      </div>
  )
}

export default TopBottom;
