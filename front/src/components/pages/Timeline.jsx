import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles, Typography, Grid, useMediaQuery } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import { getPictures } from '../../lib/api/pictures';
import AlertMessage from '../utils/AlertMessage';
import Loader from './Loader';
import TimelineCard from '../molecules/TimelineCard';

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
  },
  animation: {
    transition: '1s',
    opacity: '1',
    padding: '0 70px',
    margin: '24px auto 30px',
  },
  minAnimation: {
    transition: '1s',
    opacity: '1',
    margin: '24px auto 30px',
  },
  before: {
    opacity: '0',
    padding: '0 70px',
    margin: '12px auto 30px',
  },
  minBefore: {
    opacity: '0',
    margin: '12px auto 30px',
  },
  header: {
    paddingTop: '20px',
    paddingBottom: '20px',
    fontWeight: 'bold',
  },
  pagination: {
    display: 'inline-block',
  },
  pageWrapper: {
    marginTop: '80px',
    marginBottom: '30px',
  },
}));

function Timeline() {
  const classes = useStyles();
  const location = useLocation();
  const matches = useMediaQuery('(min-width:575px)');
  // const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [successMessageOpen, setSuccessMessageOpen] = useState(
    location.state ? location.state.successMessageOpen : false,
  );

  // const handlePageChange = (page) => {
  //   const params = createSearchParams({
  //     page: page,
  //   })
  //   navigate(`/?${params}`);
  // }

  const handleGetPictures = useCallback(async () => {
    try {
      const res = await getPictures();
      if (res.status === 200) {
        const { data } = res;
        setPictures(data);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  }, []);

  useEffect(() => {
    handleGetPictures();
  }, [handleGetPictures, page]);

  return (
    <>
      {matches ? (
        <>
          {!loading ? (
            <>
              <div className={isOpen ? classes.animation : classes.before}>
                <Typography className={classes.header} variant="h4">
                  タイムライン
                </Typography>
                <Grid container spacing={3}>
                  {pictures.map(
                    (picture, i) =>
                      Math.floor(i / 6 + 1) === page && (
                        <Grid
                          item
                          className={classes.gridItem}
                          xs={12}
                          sm={6}
                          md={4}
                          key={picture.id}
                        >
                          <TimelineCard picture={picture} user={picture.user} />
                        </Grid>
                      ),
                  )}
                </Grid>
                <AlertMessage
                  open={successMessageOpen}
                  setOpen={setSuccessMessageOpen}
                  severity="success"
                  message="ログインに成功しました"
                />
              </div>
              <div className={classes.pageWrapper}>
                {pictures.length > 6 && (
                  <Pagination
                    count={Math.ceil(pictures.length / 6)}
                    page={page}
                    onChange={(e, p) => {
                      setPage(p);
                    }}
                    color="primary"
                    className={classes.pagination}
                  />
                )}
              </div>
            </>
          ) : (
            <Loader />
          )}
        </>
      ) : (
        <>
          {!loading ? (
            <>
              <div
                className={isOpen ? classes.minAnimation : classes.minBefore}
              >
                <Typography className={classes.header} variant="h4">
                  タイムライン
                </Typography>
                <Grid container spacing={3}>
                  {pictures.map(
                    (picture, i) =>
                      Math.floor(i / 6 + 1) === page && (
                        <Grid
                          item
                          className={classes.gridItem}
                          xs={12}
                          sm={6}
                          md={4}
                          key={picture.id}
                        >
                          <TimelineCard picture={picture} user={picture.user} />
                        </Grid>
                      ),
                  )}
                </Grid>
                <AlertMessage
                  open={successMessageOpen}
                  setOpen={setSuccessMessageOpen}
                  severity="success"
                  message="ログインに成功しました"
                />
              </div>
              <div className={classes.pageWrapper}>
                {pictures.length > 6 && (
                  <Pagination
                    count={Math.ceil(pictures.length / 6)}
                    page={page}
                    onChange={(e, p) => {
                      setPage(p);
                    }}
                    color="primary"
                    className={classes.pagination}
                  />
                )}
              </div>
            </>
          ) : (
            <Loader />
          )}
        </>
      )}
    </>
  );
}

export default Timeline;
