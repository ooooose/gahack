import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  imageScales: {
    maxWidth: '100%',
    height: 'auto'
  }
}))


export const Picture = (props) => {
  let classes = useStyles();
  let image_src = "data:image/png;base64," + props.image;

  return (
    <img src={image_src} alt={props.theme.name} className={classes.imageScales} />
  )
}