import React from 'react';

import { makeStyles, IconButton } from "@material-ui/core";

import { createLike } from "../../../lib/api/likes";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
  },
  likeButton: {
    cursor: 'pointer',
    color: 'gray',
    opacity: '0.5',
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

const LikeButton = ({params, setLikeState, likes, setLikes}) => {
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
      <div className={classes.container}>
        <IconButton className={classes.likeButton}   onClick={handleCreateLike} >
          <FavoriteBorderIcon />
          <span className={classes.length}>{likes}</span>
        </IconButton>
      </div>
    </>
  )
};

export default LikeButton;