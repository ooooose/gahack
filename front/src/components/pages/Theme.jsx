import React, { useState, useEffect } from "react";

import PictureCard from "../atoms/cards/PictureCard";

import { Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { showTheme } from "../../lib/api/themes";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  animation: {
    transition: '1s',
    opacity: '1',
  },
  before: {
    opacity: '0',
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
              <Grid item xs={4} key={picture.id}>
                <PictureCard
                  picture={picture} 
                  pictureId={picture.id}
                  pictures={pictures}
                  setPictures={setPictures}
                />
              </Grid>
            ))
          }
        </Grid>
      </div>
    </>
  )
}

export default Theme;