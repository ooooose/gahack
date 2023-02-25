import React from 'react';
import { Tooltip, Button, Typography, Divider, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from "../../css/layouts/Footer.module.css"

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#F2F2F2',
    paddingBottom: '20px'
  },
  link: {
    textDecoration: "none"
  },
  footer: {
    display: 'inline-block',
    textAlign: 'center',
    margin: '0 auto',
  },
  divider: {
    width: '90%',
    margin: '0 auto 10px',
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}> 
        <footer className={classes.footer}>
          <div className={`${styles.footerContent}`}>
            <Tooltip title="実装中">
              <Button>
                <Link to="#" className={classes.link}>
                  利用規約
                </Link>
              </Button>
            </Tooltip>
            <Tooltip title="実装中">
              <Button>
                <Link to="#" className={classes.link}>
                  プライバシーポリシー
                </Link>
              </Button>
            </Tooltip>
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
        <Typography>
          Copyright © 2023 - All right reserved by Yuuki Oose
        </Typography>
      </div>
    </>
  )
};

export default Footer;
