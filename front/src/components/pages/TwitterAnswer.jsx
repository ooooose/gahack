import React, { useState, useEffect } from "react";
import { makeStyles, Button, useMediaQuery } from "@material-ui/core";
import { Helmet } from 'react-helmet';
import { useParams } from "react-router-dom";
import { showPicture } from '../../lib/api/pictures';
import Picture from "../atoms/picture/Picture";
import Loader from "./Loader";
import TwitterAnswerModal from "../molecules/TwitterAnswerModal";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '0 auto',
    width: '100%',
  },
  cardContent: {
    margin: '0 auto',
    height: '350px',
    textAlign: 'left'
  },
  minCardContent: {
    margin: '0 auto',
    height: '350px',
    textAlign: 'left'
  },
  picture: {
    position: 'relative',
    top: '70%',
    right: '0',
    fontSize: '10px',
  },
  minPicture: {
    position: 'relative',
    top: '60%',
    right: '0',
    fontSize: '8px',
  },
  answer: {
    fontSize: '30px',
    paddingTop: '20px',
  },
  minAnswer: {
    fontSize: '20px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
  btn: {
    fontSize: '20px',
  }
}));

function TwitterAnswer() {
  const [picture, setPicture] = useState([]);
  const [theme, setTheme] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:575px)');

  const handleShowPicture = async () => {
    try {
      const res = await showPicture(id);
      if (res.status === 200) {
        const {data} = res;
        setPicture(data);
        setTheme(data.theme);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleShowPicture();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <Helmet
              meta={[
                { property: 'og:description', content: `${picture.user.name}さんが絵を描きました！` },
                { property: 'og:url', content: `https://gahack.net/pictures/${picture.id}/twitter/` },
                { property: 'og:image', content: `https://gahack.net/TwitterCard.png` },
                { name: 'twitter:image', content: `https://gahack.net/TwitterCard.png` },
            ]}
            />
          { matches ? (
            <>
              <div className={classes.cardContent}>
                <div className={classes.picture}>
                  <Picture 
                    picture={picture} 
                    theme={theme} 
                    image={picture.image}
                    />
                </div>
              </div>
              <div className={classes.container}>
                <p className={classes.answer}>この絵のテーマはなんでしょう？</p>
                <Button className={classes.btn} color="primary" onClick={() => {setOpen(true)}} variant="contained" >
                  答えを見る
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className={classes.cardContent}>
                <div className={classes.minPicture}>
                  <Picture 
                    picture={picture} 
                    theme={theme} 
                    image={picture.image}
                    />
                </div>
              </div>
              <div className={classes.container}>
                <p className={classes.minAnswer}>この絵のテーマはなんでしょう？</p>
                <Button color="primary" onClick={() => {setOpen(true)}} variant="contained" >
                  答えを見る
                </Button>
              </div>
            </>
          )}
          <TwitterAnswerModal open={open} setOpen={setOpen} theme={theme} />
        </>
      ) : (
        <Loader />
      )}
    </>
  )
} 

export default TwitterAnswer;