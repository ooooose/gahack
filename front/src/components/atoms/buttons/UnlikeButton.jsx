import React from 'react';

import { Button, makeStyles } from "@material-ui/core";

import { deleteLike } from "../../../lib/api/likes";

const useStyles = makeStyles((theme) => ({
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none"
  },
}));

const UnLikeButton = ({params, likeState, setLikeState, likeId, likes, setLikes}) => {
  const classes = useStyles();
  const handleDeleteLike = async () => {
    try {
      const res = await deleteLike(likeId, params);
      if (res.status === 200) {
        setLikeState(false);
        // 記載方法は疑義あり。
        setLikes(prev => --prev);
        console.log('いいね解除');
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <Button
        type='submit'
        className={classes.submitBtn}
        color="default"
        onClick={handleDeleteLike}
      >
        ★ {likes}
      </Button>
    </>
  )
};

export default UnLikeButton;