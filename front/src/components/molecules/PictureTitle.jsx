import React, { useContext } from "react";
import Likes from "./Likes";
import DeletePicutreButton from "../atoms/buttons/DeletePictureButton";
import { Typography } from "@material-ui/core";
import styles from "../../css/molecules/PictureTitle.module.css";
import { AuthContext } from "../../App";

const PictureTitle = ({picture, pictureId, handleDeletePicture, handleLikedPictures}) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <div className={`${styles.pictureTitle}`}>
        <Typography variant="body2">
          {picture.user.name}さん作
        </Typography>
        <Likes 
          picture={picture} 
          pictureId={pictureId} 
          handleLikedPictures={handleLikedPictures}/>
        { currentUser.uid === picture.user.uid ? (
          <DeletePicutreButton handleDeletePicture={handleDeletePicture} />
        ) : (
          <></>
        )}
      </div>
    </>
  )
};

export default PictureTitle;