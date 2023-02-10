import React, { useState } from "react";
import { Card, makeStyles } from "@material-ui/core";
import Picture from "../picture/Picture";
import styles from '../../../css/components/Frames.module.css';

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
  const [picture, setPicture] = useState(theme.bestPicture);
  return (
    <>
      <Card
        className={classes.card}
      > { theme.bestPicture ? (
        <div className={`${styles.themeParent}`}>
          <Picture 
            picture={picture} 
            theme={theme} 
            image={picture.image} />
        </div>
      ) : (
        <h3>まだ投稿はありません。</h3>
      )
      }
        <strong>{title}</strong>の部屋
      </Card>
    </>
  )
}

export default ThemeCard;