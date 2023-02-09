import React from 'react';

import { makeStyles, Typography, IconButton, Grid} from "@material-ui/core";

import { createLike } from "../../../lib/api/likes";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    width: '100%',
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
        <Grid container>
          <Grid item xs={5} >
            <IconButton className={classes.likeButton}>
            <FavoriteBorderIcon 
              onClick={handleCreateLike} />
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

export default LikeButton;