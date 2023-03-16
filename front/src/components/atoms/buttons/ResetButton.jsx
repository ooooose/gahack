import React, { memo } from "react";

import Button from "@material-ui/core/Button";
import { makeStyles, Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none"
  },
}));

export const ResetButton = memo((props) => {
  const classes = useStyles();
  
  return (
    <Tooltip title="リセット" >
        <Button
          size="large"
          color="default"
          className={classes.submitBtn}
          onClick={props.resetCanvas}
        >
          {props.children}
        </Button>
      </Tooltip>
  )
});