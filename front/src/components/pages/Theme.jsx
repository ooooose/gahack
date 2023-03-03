import React, { useState, useEffect } from "react";

import PictureCard from "../atoms/cards/PictureCard";

import { Grid, makeStyles, Typography, useMediaQuery } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { showTheme } from "../../lib/api/themes";
import styles from "../../css/components/Frames.module.css";
import { Pagination } from "@material-ui/lab";
import Loader from "./Loader";

const useStyles = makeStyles((theme) => ({
  animation: {
    transition: '1s',
    opacity: '1',
    padding: '0 60px',
    margin: '12px auto 30px',
  },
  before: {
    opacity: '0',
    padding: '0 60px',
    margin: '0px auto 30px',
  },
  minAnimation: {
    transition: '1s',
    opacity: '1',
    padding: '0 10px',
    margin: '12px auto 30px',
  },
  minBefore: {
    opacity: '0',
    padding: '0 10px',
    margin: '0px auto 30px',
  },
  header: {
    paddingTop: '20px',
    fontWeight: 'bold'
  },
  minHeader: {
    paddingTop: '20px',
    fontWeight: 'bold',
    fontSize: '28px',
  },
  noImage: {
    textAlign: 'center',
    margin: '200px auto'
  },
  minNoImage: {
    fontSize: '25px',
    textAlign: 'center',
    margin: '200px auto'
  },
  pagination: {
    display: 'inline-block',
  },
  pageWrapper: {
    marginTop: "80px"
  },
}));

const Theme = () => {
  const [page, setPage] = useState(1);
  const classes = useStyles();
  const { id } = useParams();
  const [pictures, setPictures] = useState([]);
  const [theme, setTheme] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const matches = useMediaQuery('(min-width:575px)');

  const handleShowTheme = async () => {
    try {
      const res = await showTheme(id);
      if (res.status === 200) {
        const data = res.data;
        setTheme(data);
        setPictures(data.pictures);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }

  const animation = () => {
    setTimeout(() => { setIsOpen(true) }, 100);
  }

  useEffect(() => {
    handleShowTheme();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pictures]);

  useEffect(() => {
    animation();
  },[isOpen])

  return (
    <>
      {!loading ? (
        <>
          {matches ? (
            <>
              <div className={isOpen ? classes.animation : classes.before}>
                    <Typography
                      className={classes.header} 
                      variant="h4">{theme.title} の部屋</Typography> 
                <Grid container spacing={3}>
                  { pictures.length > 0 ? (
                    pictures.map(
                      (picture, i) =>
                        Math.floor(i / 6 + 1) === page && (
                          <Grid item xs={12} sm={6} md={4} key={picture.id}>
                            <div className={`${styles.themesParent}`}>
                              <PictureCard
                                user={picture.user}
                                picture={picture} 
                                pictureId={picture.id}
                                pictures={pictures}
                                setPictures={setPictures}
                              />
                            </div>
                          </Grid>
                    ))
                  ) : (
                    <h1 className={classes.minNoImage}>まだ投稿がありません！</h1>
                  )
                  }
                </Grid>
                <div className={classes.pageWrapper}>
                  { pictures.length > 6 && (
                    <Pagination
                      className={classes.pagination}
                      count={Math.ceil(pictures.length / 6)}
                      color="primary"
                      page={page}
                      onChange={(e, page) => {
                        setPage(page);
                        setIsOpen(false);
                      }}
                    />
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={isOpen ? classes.minAnimation : classes.minBefore}>
                    <Typography
                      className={classes.header} 
                      variant="h4">{theme.title} の部屋</Typography> 
                <Grid container spacing={3}>
                  { pictures.length > 0 ? (
                    pictures.map(
                      (picture, i) =>
                        Math.floor(i / 6 + 1) === page && (
                          <Grid item xs={12} sm={6} md={4} key={picture.id}>
                            <div className={`${styles.themesParent}`}>
                              <PictureCard
                                user={picture.user}
                                picture={picture} 
                                pictureId={picture.id}
                                pictures={pictures}
                                setPictures={setPictures}
                              />
                            </div>
                          </Grid>
                    ))
                  ) : (
                    <h1 className={classes.minNoImage}>まだ投稿がありません！</h1>
                  )
                  }
                </Grid>
                <div className={classes.pageWrapper}>
                  { pictures.length > 6 && (
                    <Pagination
                      className={classes.pagination}
                      count={Math.ceil(pictures.length / 6)}
                      color="primary"
                      page={page}
                      onChange={(e, page) => {
                        setPage(page);
                        setIsOpen(false);
                      }}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Theme;