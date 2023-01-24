import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { showPicture } from '../../lib/api/pictures';
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import Picture from '../atoms/picture/Picture';
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../css/components/Frames.module.css";
import LikeButton from '../atoms/buttons/LikeButton';
import UnLikeButton from '../atoms/buttons/UnlikeButton';
import { createComment } from '../../lib/api/comments';
import Comments from '../organisms/Comments';

const useStyles = makeStyles((theme) => ({
  animation: {
    transition: '1s',
    opacity: '1',
    marginLeft: '80px'
  },
  before: {
    opacity: '0',
    marginLeft: '80px',
  },
  textField: {
    marginTop: '60px',
    paddingRight: '40px',
    paddingLeft: '40px',
  },
  buttons: {
    paddingTop: '5px',
    float: 'right',
  },
  button: {
    width: '120px'
  },
  info: {
    textAlign: 'left',
    paddingTop: '80px',
  }
}));

const ShowPicture = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [picture, setPicture] = useState([]);
  const [user, setUser] = useState([]);
  const [likeState, setLikeState] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleShowPicture = async () => {
    try {
      const res = await showPicture(id);
      if (res.status === 200) {
        const data = res.data;
        setPicture(data);
        setUser(data.user);
        setLikeState(data.liked);
        setLikes(data.likes);
        setComments(data.comments);
      }
    } catch (e) {
      console.log(e);
    }
  };
  console.log(picture);

  const generateCommentParams = () => {
    const createCommentParams = {
      body: comment,
      picture_id: id
    };
    return createCommentParams;
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const params = generateCommentParams();
    try {
      const res = await createComment(params, id);
      console.log(res);
      setComments([...comments, res.data])
      setComment("");
    } catch (e) {
      console.log(e);
    }
  };

  setTimeout(() => { setIsOpen(true) }, 200)

  const generateParams = () => {
    const likeParams = {
      picture_id: id,
    };
    return likeParams;
  };

  useEffect(() => {
    handleShowPicture();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={isOpen ? classes.animation : classes.before}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            {comments.length > 0 ? (
              <Comments comments={comments} />
            ) : (
              <h3>まだコメントはありません</h3>
            ) }
          </Grid>
          <Grid item xs={4}>
            <div className={`${styles.parent}`}>
              <Picture picture={picture} 
                theme={picture.theme} 
                image={picture.image}
                />
              <div className={`${styles.likes}`}>
                <Typography variant="body2">
                  {user.name}さん作
                </Typography>
                { likeState ? (
                  <UnLikeButton 
                    params={generateParams()} 
                    likeState={picture.liked}
                    setLikeState={setLikeState}
                    likeId={picture.like_id}
                    likes={likes}
                    setLikes={setLikes}
                  />
                ) : (
                  <LikeButton 
                    params={generateParams()} 
                    likeState={picture.liked}
                    setLikeState={setLikeState}
                    likes={likes}
                    setLikes={setLikes}
                  />
                )}
              </div>      
            </div>
            <div className={classes.textField}>
              <TextField
                label="コメント"
                type="text"
                name="body"
                margin="normal"
                fullWidth
                multiline
                onChange={(event) => setComment(event.target.value)}
                value={comment}
              />
              <div className={classes.buttons}>
                <Button 
                  className={classes.button}
                  variant="contained" 
                  color="primary"
                  onClick={handleCommentSubmit}
                  disabled={!comment ? true : false}
                  >投稿する</Button>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            
          </Grid>
        </Grid>
      </div>
    </>
  )
};

export default ShowPicture;