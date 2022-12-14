import React, { useState, useEffect } from "react";

import PictureCard from "../atoms/cards/PictureCard";

import { Grid } from "@material-ui/core";

import { useParams } from "react-router-dom";
import { showTheme } from "../../lib/api/themes";

const Theme = () => {
  const { id } = useParams();
  const [pictures, setPictures] = useState([]);
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

  useEffect(() => {
    handleShowTheme();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
}

export default Theme;