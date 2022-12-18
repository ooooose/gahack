import React from "react";
import { makeStyles } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
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


const DrawerCloseButton = ({handleDrawerClose}) => {
  const classes = useStyles();
  return (
    <>
      <IconButton
        edge="start"
        color="white"
        onClick={handleDrawerClose}
        className={classes.menuButton}
      >
        <CloseIcon />
      </IconButton>
    </>
  )
};

export default DrawerCloseButton;