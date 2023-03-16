import React, { useState, useContext, memo, useCallback } from "react";

import { IconButton, makeStyles } from "@material-ui/core";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LikeButton from "../atoms/buttons/LikeButton";
import UnLikeButton from "../atoms/buttons/UnlikeButton";
import { AuthContext } from "../../App";
import GuestsAlert from "../utils/GuestsAlert";

const useStyles = makeStyles (() => ({
  container: {
    width: '100%',
  },
  likeButton: {
    float: 'right'
  },
  text: {
    marginTop: '12px',
    float: 'left',
  },
  length: {
    fontSize: '14px'
  },
}))


const Likes = memo(({picture, pictureId}) => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  const [likeState, setLikeState] = useState(picture.liked);
  const [likes, setLikes] = useState(picture.likes);
  const [openAlert, setOpenAlert] = useState(false);

  const generateParams = useCallback(() => {
    const likeParams = {
      picture_id: pictureId,
    };
    return likeParams;
  }, [pictureId]);

  const handleOpen = useCallback(() => {
    setOpenAlert(true);
  },[]);

  return (
    <>
    { currentUser.name === "ゲストユーザー" ? (
      <>
        <div className={classes.container}>
          <IconButton className={classes.likeButton} onClick={handleOpen} >
            <FavoriteBorderIcon />
            <span className={classes.length}>{likes}</span>
          </IconButton>
        </div>
        <GuestsAlert open={openAlert} setOpen={setOpenAlert} />
      </>
    ) : (
      <>
        { likeState ? (
          <UnLikeButton 
              params={generateParams()} 
              setLikeState={setLikeState}
              likeId={picture.like_id}
              likes={likes}
              setLikes={setLikes}
            />
        ) : (
          <LikeButton 
            params={generateParams()} 
            setLikeState={setLikeState}
            likes={likes}
            setLikes={setLikes}
          />
        )}
      </>
    )
    }
    </>
  )
});

export default Likes;
