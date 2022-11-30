import React from "react";

import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    maxWidth: 300,
  }
}))

const ThemeCard = (props) => {
  const classes = useStyles();
  return (
    <>
      <Card
        className={classes.card}
      >{props.title}</Card>
    </>
  )
}

export default ThemeCard;