import React, { memo } from "react";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none"
  },
}));

export const SignUpButton = memo((props) => {
  const classes = useStyles();
  return (
    <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        color="default"
        disabled={!!(!props.name || !props.email || !props.password || !props.passwordConfirmation)}
        className={classes.submitBtn}
        onClick={props.handleSubmit}
      >
        {props.children}
      </Button>
  )
});