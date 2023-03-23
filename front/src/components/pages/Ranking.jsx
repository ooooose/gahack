import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import { getBestPictures } from '../../lib/api/pictures';
import { getBestUsers } from '../../lib/api/users';
import Loader from './Loader';
import BestPictureCard from '../molecules/BestPictureCard';
import BestUserCard from '../molecules/BestUserCard';

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
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
  minAnimation: {
    transition: '1s',
    opacity: '1',
    padding: '0 20px',
    margin: '24px auto',
  },
  minBefore: {
    opacity: '0',
    padding: '0 20px',
    margin: '12px auto',
  },
  header: {
    paddingTop: '20px',
    paddingBottom: '20px',
    fontWeight: 'bold',
  },
  minHeader: {
    paddingTop: '20px',
    paddingBottom: '20px',
    fontWeight: 'bold',
    fontSize: '26px',
  },
  rankingContent: {
    marginBottom: '30px',
  },
  usersContent: {
    margin: '0 auto',
    display: 'flex',
  },
}));

function Ranking() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [bestPictures, setBestPictures] = useState([]);
  const [bestUsers, setBestUsers] = useState([]);
  const matches = useMediaQuery('(min-width:575px)');

  const handleGetPictures = useCallback(async () => {
    try {
      const res = await getBestPictures();
      if (res.status === 200) {
        const { data } = res;
        setBestPictures(data);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleGetUsers = useCallback(async () => {
    try {
      const res = await getBestUsers();
      if (res.status === 200) {
        const { data } = res;
        setBestUsers(data);
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
    handleGetUsers();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          {matches ? (
            <div className={isOpen ? classes.animation : classes.before}>
              <Typography className={classes.header} variant="h4">
                月間ランキング
              </Typography>
              <div className={classes.rankingContent}>
                <Typography className={classes.header} variant="h5">
                  〜Best 画伯 TOP3〜
                </Typography>
                <div className={classes.usersContent}>
                  <Grid container spacing={3}>
                    {bestUsers.map((user, index) => (
                      <Grid item xs={12} sm={6} md={4} key={user.id}>
                        <BestUserCard user={user} index={index} />
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </div>
              <div className={classes.rankingContent}>
                <Typography className={classes.header} variant="h5">
                  〜Best 絵画 TOP3〜
                </Typography>
                <Grid container spacing={3}>
                  {bestPictures.map((picture, index) => (
                    <Grid item xs={12} sm={6} md={4} key={picture.id}>
                      <BestPictureCard
                        picture={picture}
                        user={picture.user}
                        index={index}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          ) : (
            <div className={isOpen ? classes.minAnimation : classes.minBefore}>
              <Typography className={classes.header} variant="h4">
                月間ランキング
              </Typography>
              <div className={classes.rankingContent}>
                <Typography className={classes.header} variant="h5">
                  〜Best 画伯 TOP3〜
                </Typography>
                <div className={classes.usersContent}>
                  <Grid container spacing={3}>
                    {bestUsers.map((user, index) => (
                      <Grid item xs={12} sm={6} md={4} key={user.id}>
                        <BestUserCard user={user} index={index} />
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </div>
              <div className={classes.rankingContent}>
                <Typography className={classes.minHeader} variant="h5">
                  〜Best 絵画 TOP3〜
                </Typography>
                <Grid container spacing={3}>
                  {bestPictures.map((picture, index) => (
                    <Grid item xs={12} sm={6} md={4} key={picture.id}>
                      <BestPictureCard
                        picture={picture}
                        user={picture.user}
                        index={index}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Ranking;
