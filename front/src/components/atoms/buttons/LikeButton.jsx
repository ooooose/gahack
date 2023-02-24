import React, { memo } from 'react';

import { makeStyles, IconButton } from "@material-ui/core";

import { createLike } from "../../../lib/api/likes";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles((theme) => ({
  likeButton: {
    cursor: 'pointer',
    float: 'right',
  },
  text: {
    marginTop: '12px',
    float: 'left',
  },
  length: {
    fontSize: '14px'
  },
}));

const LikeButton = memo(({params, setLikeState, likes, setLikes}) => {
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
      <IconButton className={classes.likeButton}   onClick={handleCreateLike} >
        <FavoriteBorderIcon />
        <span className={classes.length}>{likes}</span>
      </IconButton>
    </>
  )
});

export default LikeButton;