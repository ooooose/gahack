import React, { memo } from "react";
import Likes from "./Likes";
import { Typography, Card, CardContent, makeStyles } from "@material-ui/core";
import styles from "../../css/molecules/PictureTitle.module.css";
import Bookmarks from "./Bookmarks";

const useStyles = makeStyles(() => ({
  icons: {
    display: 'flex',
    float: 'right',
  }
}));


const PictureTitle = memo(({ picture, pictureId }) => {
  const classes = useStyles();
  return (
    <>
      <Card className={`${styles.pictureTitle}`} >
        <CardContent>
          <Typography color="text.secondary" gutterBottom>
            {picture.user.name}さん
          </Typography>
          <div className={classes.icons}>
            <Likes 
              picture={picture} 
              pictureId={pictureId} 
            />
            <Bookmarks 
              picture={picture} 
              pictureId={pictureId} 
            />
          </div>
        </CardContent>
      </Card>
    </>
  )
});

export default PictureTitle;