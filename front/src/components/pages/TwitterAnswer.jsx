import React, { useState, useEffect } from "react";
import { makeStyles, Button, } from "@material-ui/core";
import { showPicture } from '../../lib/api/pictures';
import Picture from "../../components/atoms/picture/Picture";
import Loader from "./Loader";
import { useParams, Link } from "react-router-dom";

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
          <div className={classes.cardContent}>
            <div className={classes.picture}>
              <Picture 
                picture={picture} 
                theme={theme} 
                image={picture.image}
                />
            </div>
          </div>
          <p className={classes.answer}>この絵のテーマは<strong>{theme.title}</strong>です！</p>
          <p>お題に沿ってエモい絵描きましょう！</p>
          <Button color="primary" variant="contained" >
            <Link to="/" className={classes.link} >
              トップ画面へ
            </Link>
          </Button>
        </>
      ) : (
        <Loader />
      )}
    </>
  )
} 

export default TwitterAnswer;