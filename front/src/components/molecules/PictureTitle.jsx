import React from "react";
import Likes from "./Likes";
import { Typography, Card, CardContent } from "@material-ui/core";
import styles from "../../css/molecules/PictureTitle.module.css";

const PictureTitle = ({picture, pictureId, handleLikedPictures}) => {
  return (
    <>
      <Card className={`${styles.pictureTitle}`} >
        <CardContent>
          <Typography color="text.secondary" gutterBottom>
            {picture.user.name}さん
          </Typography>
          <Likes 
            picture={picture} 
            pictureId={pictureId} 
            handleLikedPictures={handleLikedPictures}/>
        </CardContent>
      </Card>
    </>
  )
};

export default PictureTitle;