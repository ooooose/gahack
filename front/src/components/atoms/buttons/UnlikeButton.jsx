import React from 'react';

import { makeStyles, Typography, IconButton, Grid } from "@material-ui/core";

import FavoriteIcon from '@material-ui/icons/Favorite';
import { deleteLike } from "../../../lib/api/likes";

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    width: '100%',
  },
  likeButton: {
    cursor: 'pointer',
    color: 'red',
    float: 'right'
  },
  text: {
    marginTop: '12px',
    float: 'left',
  },
}));

const UnLikeButton = ({params, setLikeState, likeId, likes, setLikes, children}) => {
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
      <div className={classes.container}>
        <Grid container>
          <Grid item xs={5} >
            <IconButton className={classes.likeButton} onClick={handleDeleteLike} >
              <FavoriteIcon />
            </IconButton>
          </Grid>
          <Grid item xs={7} >
            <Typography className={classes.text}>{likes} いいね</Typography>
          </Grid>
        </Grid>
      </div>
    </>
  )
};

export default UnLikeButton;