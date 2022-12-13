import React from 'react';

import { Button, makeStyles } from "@material-ui/core";

import { createLike } from "../../../lib/api/likes";

const useStyles = makeStyles((theme) => ({
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none"
  },
}));

const UnlikeButton = ({params, likeState, setLikeState, likes, setLikes}) => {
  const classes = useStyles();
  const handleCreateLike = async () => {
    try {
      const res = await createLike(params);
      if (res.status === 200) {
        setLikeState(true);
        // 記載方法は疑義あり。
        setLikes(likes + 1);
        console.log('いいね！');
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
        onClick={handleCreateLike}
      >
        ♡ {likes}
      </Button>
    </>
  )
};

export default UnlikeButton;