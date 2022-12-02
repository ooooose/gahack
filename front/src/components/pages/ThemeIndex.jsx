import React, { useState } from "react";

// import { RouteComponentProps, Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import ThemeCard from "../atoms/cards/ThemeCard";
import { getThemes } from "../../lib/api/themes";
import { useEffect } from "react";

const ThemeIndex = () => {
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
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        {
          themes.map((theme) => (
            <Grid item xs={4} key={theme.id}>
              <ThemeCard title={theme.title} />
            </Grid>
          ))
        }
      </Grid>
    </>
  )
}

export default ThemeIndex;