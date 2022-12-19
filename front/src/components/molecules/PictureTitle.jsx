import React from "react";
import Likes from "./Likes";
import DeletePicutreButton from "../atoms/buttons/DeletePictureButton";
import { Typography } from "@material-ui/core";
import styles from "../../css/molecules/PictureTitle.module.css";

const PictureTitle = ({picture, pictureId, handleDeletePicture}) => {
  return (
    <>
      <div className={`${styles.pictureTitle}`}>
        <Typography variant="body2">
          おんせさん作
        </Typography>
        <Likes picture={picture} pictureId={pictureId} />
        <DeletePicutreButton handleDeletePicture={handleDeletePicture} />
      </div>
    </>
  )
};

export default PictureTitle;