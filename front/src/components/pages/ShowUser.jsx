import React, { useState, useEffect } from "react";
import { showUser } from "../../lib/api/users";

import { Grid } from "@material-ui/core";

import PictureCard from "../atoms/cards/PictureCard";
import { useParams } from "react-router-dom";

const ShowUser = () => {
  const { id } = useParams();
  const [user, setUesr] = useState([]);
  const [pictures, setPictures] = useState([]);

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

  useEffect(() => {
    handleShowUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  return (
    <>
      <h1>{user.name}さんの作品一覧</h1>
      <Grid container spacing={3}>
        {
          pictures.map((picture) => (
            <Grid item xs={4} key={picture.id}>
              <PictureCard picture={picture} pictureId={picture.id} />
            </Grid>
          ))
        }
      </Grid>
    </>
  )
};

export default ShowUser;