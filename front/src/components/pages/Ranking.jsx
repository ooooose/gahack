import React, { useState, useEffect } from 'react';
import { getBestPictures } from '../../lib/api/pictures';
import { getBestUsers } from '../../lib/api/users';
import Loader from './Loader';
import BestPictureCard from '../molecules/BestPictureCard';
import BestUserCard from '../molecules/BestUserCard';
import { Typography, Grid, makeStyles } from '@material-ui/core';

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
    fontWeight: 'bold'
  },
  rankingContent: {
    marginBottom: '30px'
  },
  usersContent: {
    margin: '0 auto',
    display: 'flex'
  }
}));

const Ranking = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [bestPictures, setBestPictures] = useState([]);
  const [bestUsers, setBestUsers] = useState([]);

  const handleGetPictures = async () => {
    try {
      const res = await getBestPictures();
      if (res.status === 200) {
        const data = res.data;
        setBestPictures(data);
      }
    } catch (e) {
      console.log(e);
    }
  }
  
  const handleGetUsers = async () => {
    try {
      const res = await getBestUsers();
      if (res.status === 200) {
        const data = res.data;
        setBestUsers(data);
      } 
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
    setTimeout(() => { setIsOpen(true) }, 100);
  }

  useEffect(() => {
    handleGetPictures();
    handleGetUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className={isOpen ? classes.animation : classes.before}>
            <Typography
              className={classes.header} 
              variant="h4">月間ランキング</Typography>
            <div className={classes.rankingContent}>
              <Typography
                className={classes.header} 
                variant="h5">〜Best画伯 TOP3〜</Typography>
              <div className={classes.usersContent}>
                <Grid container spacing={3}>
                  {
                    bestUsers.map((user, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <BestUserCard user={user} index={index} />
                      </Grid>
                    ))
                  }
                </Grid>
              </div>
            </div>
            <div className={classes.rankingContent}>
              <Typography
                className={classes.header} 
                variant="h5">〜Best絵画 TOP3〜</Typography> 
              <Grid container spacing={3}>
                {
                  bestPictures.map((picture, index) => (
                    <Grid item xs={12} sm={6} md={4} key={picture.id}>
                      <BestPictureCard picture={picture} user={picture.user} index={index} />
                    </Grid>
                  ))
                }
              </Grid>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Ranking;
