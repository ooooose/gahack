import React, { useContext } from "react";
import { Drawer, makeStyles } from "@material-ui/core";

import clsx from 'clsx';
import { IconButton, Divider, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import GestureIcon from '@material-ui/icons/Gesture';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

import Cookies from "js-cookie";
import { signOut } from "../../lib/api/auth";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../App";
import Person from "@material-ui/icons/Person";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';

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
  const { isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignOut = async (e) => {
    try {
      const res = await signOut();

      if (res.data.success === true) {
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        navigate("/signin");

        console.log("Succeeded in sign out");
      } else {
        console.log("Failed in sign out");
      }
    } catch (e) {
      console.log(e);
    }
  }
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
                <Link onClick={handleSignOut} className={classes.link}>
                  <ListItem button>
                    <ListItemIcon>
                      <DirectionsRunIcon />
                    </ListItemIcon>
                    <ListItemText primary="ログアウト" />
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