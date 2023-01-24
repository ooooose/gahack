import React from "react";

import { makeStyles } from "@material-ui/core";
import styles from "../../../css/components/Frames.module.css"

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
    <div className={`${styles.first}`}>
      <img src={image_src} alt={theme} className={classes.imageScales} />
    </div>
  )
};

export default Picture;