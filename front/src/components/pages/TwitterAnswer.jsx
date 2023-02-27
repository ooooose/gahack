import React, { useState, useEffect } from "react";
import { makeStyles, Button, } from "@material-ui/core";
import { showPicture } from '../../lib/api/pictures';
import Picture from "../../components/atoms/picture/Picture";
import Loader from "./Loader";
import { Helmet } from 'react-helmet';
import { useParams } from "react-router-dom";
import TwitterAnswerModal from "../molecules/TwitterAnswerModal";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    margin: '0 auto',
    height: '350px',
    width: '400px',
    textAlign: 'left'
  },
  picture: {
    position: 'relative',
    top: '70%',
    right: '0',
    fontSize: '8px',
  },
  answer: {
    fontSize: '30px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  }
}));

const TwitterAnswer = () => {
  const [picture, setPicture] = useState([]);
  const [theme, setTheme] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const classes = useStyles();

  const handleShowPicture = async () => {
    try {
      const res = await showPicture(id);
      if (res.status === 200) {
        const data = res.data;
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
                // { name: 'twitter:card', content: 'summary_large_image' },
                // { name: 'twitter:image', content: `${process.env.REACT_APP_API}/TopImage.png` },
                // { name: 'twitter:description', content: `${picture.user.name}さんが絵を描きました！テーマはなんですか？` },
                { property: 'og:description', content: `${picture.user.name}さんが絵を描きました！テーマを当ててみましょう！` },
                { property: 'og:url', content: `${process.env.REACT_APP_API}/pictures/${picture.id}/twitter/` },
            ]}
            />
          <div className={classes.cardContent}>
            <div className={classes.picture}>
              <Picture 
                picture={picture} 
                theme={theme} 
                image={picture.image}
                />
            </div>
          </div>
          <p className={classes.answer}>この絵のテーマはなんでしょう？</p>
          <Button color="primary" onClick={() => {setOpen(true)}} variant="contained" >
            答えを見る
          </Button>
          <TwitterAnswerModal open={open} setOpen={setOpen} theme={theme} />
        </>
      ) : (
        <Loader />
      )}
    </>
  )
} 

export default TwitterAnswer;