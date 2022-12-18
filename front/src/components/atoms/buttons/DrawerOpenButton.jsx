import React from "react";
import { makeStyles } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    witdh: '60px',
    color: 'white',
    backgroundColor: 'blue',
    position: 'fixed',
    right: '70px',
    bottom: '70px',
  },
}))


const DrawerOpenButton = ({handleDrawerOpen}) => {
  const classes = useStyles();
  return (
    <>
      <IconButton
        edge="start"
        color="white"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
    </>
  )
};

export default DrawerOpenButton;