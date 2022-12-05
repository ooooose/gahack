import React from "react";

import { Picture } from "../picture/Picture";

import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    maxWidth: 300,
  }
}))

const PictureCard = (props) => {
  const classes = useStyles();
  
  return (
    <>
      <Card
        className={classes.card}
      >
        <Picture image={props.image} theme={props.theme} />
      </Card>
    </>
  )
}

export default PictureCard;