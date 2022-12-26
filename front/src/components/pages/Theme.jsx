import React, { useState, useEffect } from "react";

import PictureCard from "../atoms/cards/PictureCard";

import { Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { showTheme } from "../../lib/api/themes";
import { makeStyles } from "@material-ui/core";
import styles from "../../css/components/Frames.module.css";

const useStyles = makeStyles((theme) => ({
  animation: {
    transition: '1s',
    opacity: '1',
    padding: '0 60px',
    margin: '12px auto',
  },
  before: {
    opacity: '0',
    padding: '0 60px',
    margin: '0px auto',
  }
}));

const Theme = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [ pictures, setPictures ] = useState([]);
  const [ isOpen, setIsOpen ] = useState(false);
  const handleShowTheme = async () => {
    try {
      const res = await showTheme(id);
      if (res.status === 200) {
        const data = res.data;
        setPictures(data.pictures);
      }
    } catch (e) {
      console.log(e);
    }
  }
  setTimeout(() => { setIsOpen(true) }, 100)

  useEffect(() => {
    handleShowTheme();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={isOpen ? classes.animation : classes.before}>
        <Grid container spacing={3}>
          {
            pictures.map((picture) => (
              <Grid item xs={12} sm={6} md={4} key={picture.id}>
                <div className={`${styles.parent}`}>
                  <PictureCard
                    picture={picture} 
                    pictureId={picture.id}
                    pictures={pictures}
                    setPictures={setPictures}
                  />
                </div>
              </Grid>
            ))
          }
        </Grid>
      </div>
    </>
  )
}

export default Theme;