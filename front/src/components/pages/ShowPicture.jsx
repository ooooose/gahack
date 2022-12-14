import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { showPicture } from '../../lib/api/pictures';
import { Grid, Card } from "@material-ui/core";
import UnLikeButton from '../atoms/buttons/UnlikeButton';
import LikeButton from '../atoms/buttons/LikeButton';
import Picture from '../atoms/picture/Picture';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    maxWidth: 300,
    margin: 'auto'
  }
}));



const ShowPicture = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [picture, setPicture] = useState([]);
  const [likeState, setLikeState] = useState(false);
  const [likes, setLikes] = useState(0);
  
  const handleShowPicture = async () => {
    try {
      const res = await showPicture(id);
      if (res.status === 200) {
        const data = res.data;
        setPicture(data);
        console.log(data);
        setLikeState(data.liked);
        setLikes(data.likes)
      }
    } catch (e) {
      console.log(e);
    }
  }

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
      <Grid container spacing={10}>
        <Grid item xs={12}>
        <Card
            className={classes.card}
          >
            <Picture picture={picture} 
              theme={picture.theme} 
              image={picture.image}
              />          
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
          </Card>
          <h1>アホ！！！！</h1>
        </Grid>
      </Grid>
    </>
  )
};

export default ShowPicture;