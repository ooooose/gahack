import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PictureCard from "../atoms/cards/PictureCard";

import { Grid } from "@material-ui/core";
import { showTheme } from "../../lib/api/themes";


const Theme = () => {
  const { id } = useParams();
  const [theme, setTheme] = useState("");
  const [pictures, setPictures] = useState([]);
  const handleShowTheme = async () => {
    try {
      // showTheme()にidを指定する必要がある。
      const res = await showTheme(id);
      if (res.status === 200) {
        const data = res.data;
        setTheme(data.theme);
        setPictures(data.pictures);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    handleShowTheme();
  });

  return (
    <>
      <Grid container spacing={3}>
        {
          pictures.map((picture) => (
            <Grid item xs={4} key={picture.id}>
              <PictureCard image={picture.image} theme={theme} />
            </Grid>
          ))
        }
      </Grid>
    </>
  )
}

export default Theme;