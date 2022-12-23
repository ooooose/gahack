import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import Cookies from "js-cookie";
import clsx from 'clsx';


import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";


// import { signOut } from "../../lib/api/auth";
import { LinkButton } from "../atoms/buttons/LinkButton";

import { AuthContext } from "../../App";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
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
}))


const Header = ({open, handleDrawerOpen}) => {
  const { loading, isSignedIn } = useContext(AuthContext);
  const classes = useStyles();
  // const navigate = useNavigate();

  // const handleSignOut = async (e) => {
  //   try {
  //     const res = await signOut();

  //     if (res.data.success === true) {
  //       Cookies.remove("_access_token")
  //       Cookies.remove("_client")
  //       Cookies.remove("_uid")

  //       setIsSignedIn(false)
  //       navigate("/signin");

  //       console.log("Succeeded in sign out");
  //     } else {
  //       console.log("Failed in sign out");
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  const AuthButtons = ({handleDrawerOpen}) => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は認証用のボタンを表示
    if (!loading) {
      if (isSignedIn) {
        return (
          <>
            {/* <LinkButton
              onClick={handleSignOut}
              color={"inherit"}
            >
              サインアウト
            </LinkButton> */}
          </>
        )
      } else {
        return (
          <>
            <LinkButton
              to={"/signin"}
              color={"inherit"}
            >
              ログイン
            </LinkButton>
            <LinkButton
              to={"/signup"}
              color={"inherit"}
            >
              サインアップ
            </LinkButton>
          </>
        )
      }
    } else {
      return <></>
    }
  }

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
            to="/"
            variant="h6"
            className={classes.title}
          >
            画HACK
          </Typography>
          <AuthButtons />
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header;