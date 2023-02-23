import React, { useContext } from "react";
import { Link } from "react-router-dom";
import clsx from 'clsx';
import { AuthContext } from "../../App";

import {makeStyles,
        Avatar,
        Tooltip,
        AppBar,
        Toolbar,
        Typography,
        IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 240;

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
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  avatar: {
    float: 'right',
  }
}))


const Header = ({open, handleDrawerOpen}) => {
  const classes = useStyles();
  const { isSignedIn, currentUser } = useContext(AuthContext);

  return (
    <>
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
            画HACK
          </Typography>
          { isSignedIn ? (
            <>
              <Tooltip title={currentUser.name}>
                <Avatar
                  alt='avatar'
                  src={currentUser.image.url}
                  className={classes.avatar}
                />
              </Tooltip>
            </>
          ) : (
            <></>
          ) }
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header;
