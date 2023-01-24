import React from 'react';

import { makeStyles } from "@material-ui/core";

import FavoriteIcon from '@material-ui/icons/Favorite';
import { deleteLike } from "../../../lib/api/likes";

const useStyles = makeStyles((theme) => ({
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none",
    color: 'red',
    borderRadius: '50%',
  },
  likeButton: {
    cursor: 'pointer',
    color: 'red',
  }
}));

const UnLikeButton = ({params, setLikeState, likeId, likes, setLikes}) => {
  const classes = useStyles();
  const handleDeleteLike = async () => {
    try {
      const res = await deleteLike(likeId, params);
      if (res.status === 200) {
        setLikeState(false);
        setLikes(prev => --prev);
        console.log('いいね解除');
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <FavoriteIcon 
        className={classes.likeButton} 
        onClick={handleDeleteLike} /> {likes}
    </>
  )
};

export default UnLikeButton;