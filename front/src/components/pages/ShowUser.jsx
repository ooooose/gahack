import React, { useState, useEffect } from "react";
import { showUser } from "../../lib/api/users";

import { Grid, makeStyles } from "@material-ui/core";

import PictureCard from "../atoms/cards/PictureCard";
import { useParams } from "react-router-dom";
import styles from "../../css/components/Frames.module.css"

const useStyles = makeStyles((theme) => ({
  animation: {
    transition: '1s',
    opacity: '1',
  },
  before: {
    opacity: '0',
  },
}));

const ShowUser = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [user, setUesr] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleShowUser = async () => {
    try {
      const res = await showUser(id);
      if (res.status === 200) {
        const data = res.data;
        setUesr(data);
        setPictures(data.pictures);
      }
    } catch (e) {
      console.log(e);
    }
  }

  setTimeout(() => { setIsOpen(true) }, 300)

  useEffect(() => {
    handleShowUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  return (
    <>
      <div className={isOpen ? classes.animation : classes.before}>
        <h1>{user.name}さんの作品一覧</h1>
        <Grid container spacing={3}>
          {
            pictures.map((picture) => (
              <Grid item xs={4} key={picture.id}>
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
};

export default ShowUser;