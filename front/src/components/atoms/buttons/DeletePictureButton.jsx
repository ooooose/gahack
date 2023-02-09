import React from "react";

import { makeStyles, Tooltip, IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() => ({
  deleteButton: {
    cursor: "pointer",
  },
}))

const DeletePicutreButton = ({handleDeletePicture}) => {
  const classes = useStyles();

  return (
    <>
      <Tooltip title="絵を削除する">
        <IconButton aria-label="delete" >
          <DeleteIcon className={classes.deleteButton} onClick={handleDeletePicture} /> 
        </IconButton>
      </Tooltip>
    </>
  )
};

export default DeletePicutreButton;