import React, { useState } from "react";

import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Header from "./Header";
import SideBar from "./SideBar";
import DrawerOpenButton from "../atoms/buttons/DrawerOpenButton";
import DrawerCloseButton from "../atoms/buttons/DrawerCloseButton";
import clsx from 'clsx';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  container: {
    marginTop: '6rem',
    textAlign: "center"
  },
  main: {
    width: '100%',
    textAlign: 'center',
    paddingLeft: '60px',
    padding: '90px 0',
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  mainShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const CommonLayout = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className={classes.root}>
        <Header
          open={open}
          handleDrawerOpen={handleDrawerOpen}  
        />
        <SideBar open={open} handleDrawerClose={handleDrawerClose} />
        <main className={clsx(classes.main, open && classes.mainShift)}>
          <Container maxWidth='lg' >
            <Grid sytle={{justify:"center"}}>
              <Grid item>
                {props.children}
              </Grid>
            </Grid>
          </Container>
          { open ? (
            <DrawerCloseButton handleDrawerClose={handleDrawerClose} />
          ) : (
            <DrawerOpenButton handleDrawerOpen={handleDrawerOpen} />
          )}
        </main>
      </div>
    </>
  )
};

export default CommonLayout;
