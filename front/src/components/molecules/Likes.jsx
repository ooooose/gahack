// いいねに関する情報を管理するコンポーネント
import React, { useState } from "react";

import LikeButton from "../atoms/buttons/LikeButton";
import UnLikeButton from "../atoms/buttons/UnlikeButton";


const Likes = ({picture, pictureId}) => {
  const [likeState, setLikeState] = useState(picture.liked);
  const [likes, setLikes] = useState(picture.likes);

  const generateParams = () => {
    const likeParams = {
      picture_id: pictureId,
    };
    return likeParams;
  };

  return (
    <>
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
    </>
  )
  
}

export default Likes;