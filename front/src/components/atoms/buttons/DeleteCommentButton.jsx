import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  deleteButton: {
    cursor: "pointer",
    color: 'gray',
    marginLeft: '8px',
    marginTop: '10px',
  },
}));

function DeleteCommentButton({handleDeleteComment}) {
  const classes = useStyles();

  return (
    <DeleteIcon className={classes.deleteButton} onClick={handleDeleteComment} />
  )
}

export default DeleteCommentButton;