import React, { useState } from "react";

import { Picture } from "../picture/Picture";
import LikeButton from "../buttons/LikeButton";
import UnLikeButton from "../buttons/UnlikeButton";

import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    maxWidth: 300,
  }
}))

const PictureCard = ({picture, pictureId }) => {
  const [likes, setLikes] = useState(picture.likes);
  const [likeState, setLikeState] = useState(picture.liked);
  const classes = useStyles();

  const generateParams = () => {
    const likeParams = {
      picture_id: pictureId,
    };
    return likeParams;
  };
  
  return (
    <>
      <Card
        className={classes.card}
      >
        <Picture image={picture.image} />
        { likeState ? (
          <UnLikeButton 
            params={generateParams()} 
            likeState={picture.liked}
            setLikeState={setLikeState}
            likeId={picture.like_id}
            likes={likes}
            setLikes={setLikes}
          />
        ) : (
          <LikeButton 
            params={generateParams()} 
            likeState={picture.liked}
            setLikeState={setLikeState}
            likes={likes}
            setLikes={setLikes}
          />
        )}
      </Card>
    </>
  )
}

export default PictureCard;