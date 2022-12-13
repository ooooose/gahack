import React, { useState } from "react";
import { Link } from 'react-router-dom';

import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/styles";
import { getThemes } from "../../lib/api/themes";
import { useEffect } from "react";
import ThemeCard from "../atoms/cards/ThemeCard";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
  }
}));


const ThemeIndex = () => {
  const classes = useStyles();
  const [themes, setThemes] = useState([]);
  const handleGetThemes = async () => {
    try {
      const res = await getThemes();
      if (res.status === 200) {
        const data = res.data;
        setThemes(data);
      }
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    handleGetThemes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        {
          themes.map((theme) => (
            <Grid item xs={4} key={theme.id}>
              <Link to={{
                pathname: "/themes/" + theme.id,
                state: {id: theme.id}
              }}
              id={theme.id}
              className = {classes.link}
              >
                <ThemeCard theme={theme} title={theme.title} />
              </Link>
            </Grid>
          ))
        }
      </Grid>
    </>
  )
}

export default ThemeIndex;