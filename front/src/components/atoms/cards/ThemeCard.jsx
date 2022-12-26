import React from "react";

import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    maxWidth: 300,
  },
  imageScales: {
    maxWidth: '80%',
    height: '150px',
  }
}))

const ThemeCard = ({theme, title}) => {
  const classes = useStyles();
  const image_src = "data:image/png;base64," + theme.bestPicture.image;
  return (
    <>
      <Card
        className={classes.card}
      >
        <img src={image_src} alt={theme} className={classes.imageScales} /><br/>
        <strong>{title}</strong>の部屋
      </Card>
    </>
  )
}

export default ThemeCard;