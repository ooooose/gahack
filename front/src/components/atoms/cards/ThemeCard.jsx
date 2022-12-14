import React from "react";

import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    maxWidth: 300,
  }
}))

const ThemeCard = ({theme, title}) => {
  const classes = useStyles();
  return (
    <>
      <Card
        className={classes.card}
      ><strong>{title}</strong>の部屋</Card>
    </>
  )
}

export default ThemeCard;