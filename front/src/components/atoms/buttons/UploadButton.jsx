import React from "react";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none"
  },
}));

export const UploadButton = (props) => {
  const classes = useStyles();
  
  return (
    <>
      <Button
        variant="contained"
        size="large"
        color="default"
        fullWidth
        disabled={!props.theme ? true : false}
        className={classes.submitBtn}
        onClick={props.uploadCanvas}
      >
        {props.children}
      </Button>
    </>
  )
};