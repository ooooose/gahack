import React from "react";

import Picture from "../picture/Picture";
import { Link } from "react-router-dom";

import PictureTitle from "../../molecules/PictureTitle";
import { deletePicture } from "../../../lib/api/pictures";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    maxWidth: 300,
    margin: 'auto'
  },
}))

const PictureCard = ({picture, pictureId, pictures, setPictures}) => {
  const classes = useStyles();
  const handleDeletePicture = async () => {
    try {
      const res = await deletePicture(pictureId);
      if (res.status === 200) {
        const newPictures = pictures.filter((picture) => {
          return picture.id !== pictureId;
        });
        setPictures(newPictures);
        window.alert('削除しました！');
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <Link to={{
          pathname: "/pictures/" + picture.id,
          state: {id: picture.id}
        }}
        id={picture.id}
        className = {classes.link}
      >
        <Picture picture={picture} 
          theme={picture.theme} 
          image={picture.image}
          />          
      </Link>
      <PictureTitle 
        picture={picture} 
        pictureId={pictureId} 
        handleDeletePicture={handleDeletePicture} 
      />
    </>
  )
}

export default PictureCard;