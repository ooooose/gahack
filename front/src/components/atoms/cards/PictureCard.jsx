import React from "react";

import Picture from "../picture/Picture";
import { Link } from "react-router-dom";

import PictureTitle from "../../molecules/PictureTitle";
import { deletePicture } from "../../../lib/api/pictures";

const PictureCard = ({picture, pictureId, pictures, setPictures, setLikedPictures}) => {
  const handleDeletePicture = async () => {
    if (window.confirm('削除しますか？')){
      try {
        const res = await deletePicture(pictureId);
        if (res.status === 200) {
          const newPictures = pictures.filter((picture) => {
            return picture.id !== pictureId;
          });
          setPictures(newPictures);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <>
      <Link to={{
          pathname: "/pictures/" + picture.id,
          state: {id: picture.id}
        }}
        id={picture.id}
        >
        <Picture 
          picture={picture} 
          theme={picture.theme} 
          image={picture.image}
          />          
      </Link>
      <PictureTitle 
        picture={picture} 
        pictureId={pictureId} 
        handleDeletePicture={handleDeletePicture}
        setLikedPictures={setLikedPictures}
      />
    </>
  )
}

export default PictureCard;