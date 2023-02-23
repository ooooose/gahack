import React, { memo } from "react";

import Picture from "../picture/Picture";
import { Link } from "react-router-dom";

import PictureTitle from "../../molecules/PictureTitle";

const PictureCard = memo(({picture, pictureId }) => {

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
      />
    </>
  )
});

export default PictureCard;