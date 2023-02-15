import React from 'react';

import { makeStyles, IconButton } from "@material-ui/core";

import FavoriteIcon from '@material-ui/icons/Favorite';
import { deleteLike } from "../../../lib/api/likes";

const useStyles = makeStyles(() => ({
  likeButton: {
    cursor: 'pointer',
    color: 'red',
    float: 'right'
  },
  text: {
    marginTop: '12px',
    float: 'left',
  },
  length: {
    fontSize: '14px'
  },
}));

const UnLikeButton = ({params, setLikeState, likeId, likes, setLikes }) => {
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
      <IconButton className={classes.likeButton} onClick={handleDeleteLike} >
        <FavoriteIcon />
        <span className={classes.length}>{likes}</span>
      </IconButton>
    </>
  )
};

export default UnLikeButton;