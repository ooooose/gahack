import React, { memo } from "react";
import { Card, makeStyles, Tooltip } from "@material-ui/core";
import Picture from "../picture/Picture";
import styles from '../../../css/components/Frames.module.css';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
  },
  imageScales: {
    maxWidth: '80%',
    height: '150px',
  }
}))

const ThemeCard = memo(({theme, picture, title}) => {
  const classes = useStyles();
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
      { title.length > 10 ? (
        <Tooltip title={title}>
          <p><strong>{title.substring(0 ,10) + '...'}</strong>の部屋</p>
        </Tooltip>
      ) : (
        <p><strong>{title}</strong>の部屋</p>
      ) }
      </Card>
    </>
  )
});

export default ThemeCard;