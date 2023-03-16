import React, { useContext, memo } from "react";
import { Link } from "react-router-dom";
import clsx from 'clsx';
import {makeStyles,
        Avatar,
        Tooltip,
        AppBar,
        Toolbar,
        Typography,
        IconButton,
        useMediaQuery } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { AuthContext } from "../../App";
import TopLogo from '../../assets/img/TopLogo.png';


const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#2196f3',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit"
  },
  logo: {
    width: '120px'
  },
  minLogo: {
    width: '120px',
    margin: '0 auto',
    display: 'block',
    paddingRight: '48px'
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  avatar: {
    float: 'right',
  },
  minAvatar: {
    float: 'right',
    marginRight: '10px',
  },
}))


const Header = memo(({open, handleDrawerOpen}) => {
  const classes = useStyles();
  const { isSignedIn, currentUser } = useContext(AuthContext);
  const matches = useMediaQuery('(min-width:575px)');

  return (
    <>
    {matches ? (
      <AppBar
          className={clsx(classes.appBar, open && classes.appBarShift)}
          position="fixed"
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component={Link}
              variant="h5"
              to="/"
              className={classes.title}
            >
              <img className={classes.logo} src={TopLogo} alt="Logo" />
            </Typography>
            { isSignedIn ? (
              <Tooltip title={`ようこそ、${currentUser.name}さん！`}>
                  <Avatar
                    alt='avatar'
                    src={currentUser.image.url}
                    className={classes.avatar}
                  />
                </Tooltip>
            ) : (
              <></>
            ) }
          </Toolbar>
        </AppBar>
    ) : (
      <AppBar
          className={clsx(classes.appBar, open && classes.appBarShift)}
          position="fixed"
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component={Link}
              variant="h5"
              to="/"
              className={classes.title}
            >
              <img className={classes.minLogo} src={TopLogo} alt="Logo" />
            </Typography>
            { isSignedIn ? (
              <Tooltip title={`ようこそ、${currentUser.name}さん！`}>
                  <Avatar
                    alt='avatar'
                    src={currentUser.image.url}
                    className={classes.minAvatar}
                  />
                </Tooltip>
            ) : (
              <></>
            ) }
          </Toolbar>
        </AppBar>
    )}
    </>
  )
});

export default Header;
