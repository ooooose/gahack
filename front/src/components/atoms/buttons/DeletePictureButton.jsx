import React from "react";

import { makeStyles } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() => ({
  deleteButton: {
    cursor: "pointer",
    marginLeft: '8px',
  },
}))

const DeletePicutreButton = ({handleDeletePicture}) => {
  const classes = useStyles();

  return (
    <>
      <DeleteIcon className={classes.deleteButton} onClick={handleDeletePicture} /> 
    </>
  )
};

export default DeletePicutreButton;