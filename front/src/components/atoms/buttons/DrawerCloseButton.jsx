import React from "react";
import { makeStyles } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    witdh: '60px',
    color: 'white',
    position: 'fixed',
    backgroundColor: '#3f51b5',
    right: '50px',
    bottom: '50px',
  },
}))


const DrawerCloseButton = ({handleDrawerClose}) => {
  const classes = useStyles();
  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        onClick={handleDrawerClose}
        className={classes.menuButton}
      >
        <CloseIcon />
      </IconButton>
    </>
  )
};

export default DrawerCloseButton;