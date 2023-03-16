import React, { memo } from "react";

import { Link } from "react-router-dom";
import Picture from "../picture/Picture";

import PictureTitle from "../../molecules/PictureTitle";

const PictureCard = memo(({user, picture, pictureId }) => (
    <>
      <Link to={{
          pathname: `/pictures/${  picture.id}`,
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
        user={user}
        picture={picture} 
        pictureId={pictureId} 
      />
    </>
  ));

export default PictureCard;