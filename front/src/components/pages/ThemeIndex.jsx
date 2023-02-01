import React, { useState } from "react";
import { Link } from 'react-router-dom';

import { Grid, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";
import { getThemes } from "../../lib/api/themes";
import { useEffect } from "react";
import ThemeCard from "../atoms/cards/ThemeCard";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
  },
  animation: {
    transition: '1s',
    opacity: '1',
    padding: '0 70px',
    margin: '24px auto',
  },
  before: {
    opacity: '0',
    padding: '0 70px',
    margin: '12px auto',
  },
  header: {
    paddingTop: '20px',
    paddingBottom: '20px',
  },
  pagination: {
    display: 'inline-block',
  },
  pageWrapper: {
    marginTop: '80px',
  }
}));


const ThemeIndex = () => {
  const [page, setPage] = useState(1);
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
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

  setTimeout(() => { setIsOpen(true) }, 100);

  return (
    <>
      <div className={isOpen ? classes.animation : classes.before}>
        <Typography className={classes.header} variant="h4">テーマ一覧</Typography> 
        <Grid container spacing={3}>
          {
            themes.map((theme,i) => (
              Math.floor(i / 6 + 1) === page && <Grid item className={classes.gridItem} xs={12} sm={6} md={4} key={theme.id}>
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
        <div className={classes.pageWrapper}>
          { themes.lenght > 6 && (
            <Pagination 
              count={Math.ceil(themes.length / 6)}
              page={page}
              onChange={(e, page) => setPage(page)}
              color="primary"
              className={classes.Pagination}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default ThemeIndex;