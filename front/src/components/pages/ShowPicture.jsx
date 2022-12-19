import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { showPicture } from '../../lib/api/pictures';
import { Grid, Typography } from "@material-ui/core";
import Picture from '../atoms/picture/Picture';
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../css/components/Frames.module.css";
import LikeButton from '../atoms/buttons/LikeButton';
import UnLikeButton from '../atoms/buttons/UnlikeButton';

const useStyles = makeStyles((theme) => ({
  animation: {
    transition: '1s',
    opacity: '1',
  },
  before: {
    opacity: '0',
  },
}));

const ShowPicture = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [picture, setPicture] = useState([]);
  const [likeState, setLikeState] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleShowPicture = async () => {
    try {
      const res = await showPicture(id);
      if (res.status === 200) {
        const data = res.data;
        setPicture(data);
        setLikeState(data.liked);
        setLikes(data.likes);
      }
    } catch (e) {
      console.log(e);
    }
  }

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
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <div className={`${styles.parent}`}>
              <Picture picture={picture} 
                theme={picture.theme} 
                image={picture.image}
                />
              <div className={`${styles.likes}`}>
                <Typography variant="body2">
                  おんせさん作
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
          </Grid>
        </Grid>
      </div>
    </>
  )
};

export default ShowPicture;