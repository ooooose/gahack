import React from "react";

import Picture from "../picture/Picture";
import { Link } from "react-router-dom";

import Likes from "../../molecules/Likes";
import { deletePicture } from "../../../lib/api/pictures";

import DeletePicutreButton from "../buttons/DeletePictureButton";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    maxWidth: 300,
    margin: 'auto'
  }
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
      <Card
        className={classes.card}
      >
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
        <Likes picture={picture} pictureId={pictureId} />
        <DeletePicutreButton pictureId={pictureId} handleDeletePicture={handleDeletePicture} />
      </Card>
    </>
  )
}

export default PictureCard;