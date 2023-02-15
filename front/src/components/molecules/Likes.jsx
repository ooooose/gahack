// いいねに関する情報を管理するコンポーネント
import React, { useState, useContext } from "react";

import { IconButton, makeStyles, Typography, Grid } from "@material-ui/core";
import LikeButton from "../atoms/buttons/LikeButton";
import UnLikeButton from "../atoms/buttons/UnlikeButton";
import { AuthContext } from "../../App";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import GuestsAlert from "../utils/GuestsAlert";

const useStyles = makeStyles (() => ({
  UnlikeButton: {
    opacity: '0.5',
  },
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
  length: {
    fontSize: '14px'
  },
}))


const Likes = ({picture, pictureId}) => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  const [likeState, setLikeState] = useState(picture.liked);
  const [likes, setLikes] = useState(picture.likes);
  const [openAlert, setOpenAlert] = useState(false);

  const generateParams = () => {
    const likeParams = {
      picture_id: pictureId,
    };
    return likeParams;
  };
  const handleOpen = () => {
    setOpenAlert(true);
  }
  return (
    <>
    { currentUser.email === "guest@example.com" ? (
      <>
        <div className={classes.container}>
          <Grid container>
            <Grid item xs={5} >
              <IconButton className={classes.likeButton} onClick={handleOpen} >
                <FavoriteBorderIcon 
                className={classes.UnlikeButton}
                />
                <span className={classes.length}>{likes.length}</span>
              </IconButton>
            </Grid>
            <Grid item xs={7} >
              <Typography className={classes.text}>{likes} いいね</Typography>
            </Grid>
          </Grid>
        </div>
        <GuestsAlert open={openAlert} setOpen={setOpenAlert} />
      </>
    ) : (
      <>
        { likeState ? (
          <>
            <UnLikeButton 
              params={generateParams()} 
              likeState={picture.liked}
              setLikeState={setLikeState}
              likeId={picture.like_id}
              likes={likes}
              setLikes={setLikes}
            />
          </>
        ) : (
          <LikeButton 
            params={generateParams()} 
            likeState={picture.liked}
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
  
}

export default Likes;