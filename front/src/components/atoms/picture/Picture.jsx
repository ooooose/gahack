import React from "react";

import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles(() => ({
  imageScales: {
    maxWidth: '100%',
    height: 'auto'
  }
}))


const Picture = ({theme, image}) => {
  const classes = useStyles();
  const image_src = "data:image/png;base64," + image;

  return (
    <img src={image_src} alt={theme} className={classes.imageScales} />
  )
};

export default Picture;