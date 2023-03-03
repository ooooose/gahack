import React, { useContext, memo } from "react";
import { Drawer, makeStyles } from "@material-ui/core";

import clsx from 'clsx';
import { IconButton, Divider, List, ListItem, ListItemIcon, ListItemText, Tooltip } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { FaMedal } from 'react-icons/fa';
import { MdDraw } from 'react-icons/md'
import Cookies from "js-cookie";
import { signOut } from "../../lib/api/auth";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../App";
import Person from "@material-ui/icons/Person";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import { IoDocumentText } from 'react-icons/io5';
import { MdPolicy } from 'react-icons/md';

const drawerWidth = 250;

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
    width: theme.spacing(0),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.secondary,
  },
}));


const SideBar = memo(({open, handleDrawerClose}) => {
  const classes = useStyles();
  const { isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignOut = async (e) => {
    if (window.confirm("ログアウトしますか？") === true) {
      try {
        const res = await signOut();
  
        if (res.data.success === true) {
          Cookies.remove("_access_token")
          Cookies.remove("_client")
          Cookies.remove("_uid")
  
          setIsSignedIn(false)
          handleDrawerClose();
          navigate("/", {state: { successMessageOpen: true }});
  
          console.log("Succeeded in sign out");
        } else {
          console.log("Failed in sign out");
        }
      } catch (e) {
        console.log(e);
      }
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
                { currentUser.name === "ゲストユーザー" ? (
                  <></>
                ) : (
                  <Link to={`/users/${currentUser.id}`} className={classes.link} onClick={handleDrawerClose}>
                      <ListItem button>
                        <Tooltip title="プロフィール">
                          <ListItemIcon>
                            <Person />
                          </ListItemIcon>
                        </Tooltip>
                        <ListItemText primary="プロフィール" />
                      </ListItem>
                  </Link>
                )}
                <Link to="/ranking" className={classes.link} onClick={handleDrawerClose}>
                  <ListItem button>
                    <Tooltip title="月間ランキング">
                      <ListItemIcon>
                        <FaMedal size={'1.5rem'} />
                      </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="月間ランキング" />
                  </ListItem>
                </Link>
                <Link to="/themes" className={classes.link} onClick={handleDrawerClose}>
                  <ListItem button>
                    <Tooltip title="テーマ一覧">
                      <ListItemIcon>
                        <PhotoLibraryIcon />
                      </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="テーマ一覧" />
                  </ListItem>
                </Link>
                <Link to="/picture" className={classes.link} onClick={handleDrawerClose}>
                  <ListItem button>
                    <Tooltip title="キャンバス">
                      <ListItemIcon>
                        <MdDraw size={'1.7rem'} />
                      </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="キャンバス" />
                  </ListItem>
                </Link>
                <Link
                  to={"/termsofservice"}
                  className={classes.link}
                  onClick={handleDrawerClose}
                >
                  <ListItem button>
                    <Tooltip title="利用規約">
                      <ListItemIcon>
                        <IoDocumentText size={"1.5rem"} />
                      </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="利用規約" />
                  </ListItem>
                </Link>
                <Link
                  to={"/privacypolicy"}
                  className={classes.link}
                  onClick={handleDrawerClose}
                >
                  <ListItem button>
                    <Tooltip title="プライバシーポリシー">
                      <ListItemIcon>
                        <MdPolicy size={"1.6rem"} />
                      </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="プライバシーポリシー" />
                  </ListItem>
                </Link>
                <Link onClick={handleSignOut} className={classes.link}>
                  <ListItem button>
                    <Tooltip title="ログアウト">
                      <ListItemIcon>
                        <DirectionsRunIcon />
                      </ListItemIcon>
                    </Tooltip>
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
              onClick={handleDrawerClose}
            >
              <ListItem button>
                <ListItemIcon>
                  <Tooltip title="ログイン">
                    <ExitToAppIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="ログイン" />
              </ListItem>
            </Link>
            <Link
              to={"/signup"}
              className={classes.link}
              onClick={handleDrawerClose}
            >
              <ListItem button>
                <ListItemIcon>
                  <Tooltip title="ユーザー登録">
                    <Person />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary="ユーザー登録" />
              </ListItem>
            </Link>
            <Link
              to={"/termsofservice"}
              className={classes.link}
              onClick={handleDrawerClose}
            >
              <ListItem button>
                <Tooltip title="利用規約">
                  <ListItemIcon>
                    <IoDocumentText size={"1.5rem"} />
                  </ListItemIcon>
                </Tooltip>
                <ListItemText primary="利用規約" />
              </ListItem>
            </Link>
            <Link
              to={"/privacypolicy"}
              className={classes.link}
              onClick={handleDrawerClose}
            >
              <ListItem button>
                <Tooltip title="プライバシーポリシー">
                  <ListItemIcon>
                    <MdPolicy size={"1.6rem"} />
                  </ListItemIcon>
                </Tooltip>
                <ListItemText primary="プライバシーポリシー" />
              </ListItem>
            </Link>
          </>
          )
        }
      </Drawer>
    </>
  )
});

export default SideBar;
