import React from 'react';

import { makeStyles } from "@material-ui/core";

import { createLike } from "../../../lib/api/likes";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles((theme) => ({
  UnlikeButton: {
    cursor: 'pointer',
    opacity: '0.5'
  },
}));

const LikeButton = ({params, setLikeState, likes, setLikes, children}) => {
  const classes = useStyles();
  const handleCreateLike = async () => {
    try {
      const res = await createLike(params);
      if (res.status === 200) {
        setLikeState(true);
        setLikes(prev => ++prev);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <FavoriteBorderIcon 
        className={classes.UnlikeButton} 
        onClick={handleCreateLike} /> {children}
    </>
  )
};

export default LikeButton;