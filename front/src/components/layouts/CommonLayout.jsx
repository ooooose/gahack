import React, { useState } from "react";

import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Header from "./Header";
import SideBar from "./SideBar";
import DrawerOpenButton from "../atoms/buttons/DrawerOpenButton";
import DrawerCloseButton from "../atoms/buttons/DrawerCloseButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  container: {
    textAlign: "center",
  },
  main: {
    width: '100%',
    textAlign: 'center',
    paddingTop: '60px',
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
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
    <>/
      <div className={classes.root}>
        <Header
          open={open}
          handleDrawerOpen={handleDrawerOpen}  
        />
        <SideBar open={open} handleDrawerClose={handleDrawerClose} />
        <main className={classes.main}>
          <Container disableGutters={true} className={classes.container} maxWidth='lg' >
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
