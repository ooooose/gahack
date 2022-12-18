import React, { useContext } from "react";
import { Drawer, makeStyles } from "@material-ui/core";

import clsx from 'clsx';
import { IconButton, Divider, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import GestureIcon from '@material-ui/icons/Gesture';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

import { Link } from "react-router-dom";
import { AuthContext } from "../../App";
import Person from "@material-ui/icons/Person";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  drawerPaper: {
    position: "fixed",
    height: '100%',
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.secondary,
  },
}));


const SideBar = ({open, handleDrawerClose}) => {
  const classes = useStyles();
  const { isSignedIn, currentUser } = useContext(AuthContext);
  return (
    <>
      <Drawer 
        anchor='left' 
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        { isSignedIn ? 
          (
            <>
              <List>
                <Link to={`/users/${currentUser?.id}`} className={classes.link}>
                  <ListItem button>
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText primary="プロフィール" />
                  </ListItem>
                </Link>
                <Link to="/themes" className={classes.link}>
                  <ListItem button>
                    <ListItemIcon>
                      <PhotoLibraryIcon />
                    </ListItemIcon>
                    <ListItemText primary="テーマ一覧" />
                  </ListItem>
                </Link>
                <Link to="/picture" className={classes.link}>
                  <ListItem button>
                    <ListItemIcon>
                      <GestureIcon />
                    </ListItemIcon>
                    <ListItemText primary="キャンバス" />
                  </ListItem>
                </Link>
              </List>
            </>
          ) : (
            <>
            <Link
              to={"/signin"}
              className={classes.link}
            >
              <ListItem button>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="ログイン" />
              </ListItem>
            </Link>
            <Link
              to={"/signup"}
              className={classes.link}
            >
              <ListItem button>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="サインアップ" />
              </ListItem>
            </Link>
          </>
          )
        }
      </Drawer>
    </>
  )
}

export default SideBar;