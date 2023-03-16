import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Grid, Typography, useMediaQuery } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import { Pagination } from '@material-ui/lab';
import { getThemes } from '../../lib/api/themes';
import ThemeCard from '../atoms/cards/ThemeCard';
import Loader from './Loader';

const useStyles = makeStyles((theme) => ({
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
  pagination: {
    display: 'inline-block',
  },
  pageWrapper: {
    marginTop: '40px',
    marginBottom: '30px',
  },
}));

function ThemeIndex() {
  const [page, setPage] = useState(1);
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const matches = useMediaQuery('(min-width:575px)');

  const handleGetThemes = useCallback(async () => {
    try {
      const res = await getThemes();
      if (res.status === 200) {
        const { data } = res;
        setThemes(data);
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
    handleGetThemes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!loading ? (
        <>
          {matches ? (
            <>
              <div className={isOpen ? classes.animation : classes.before}>
                <Typography className={classes.header} variant="h4">
                  テーマ一覧
                </Typography>
                <Grid container spacing={3}>
                  {themes.map(
                    (theme, i) =>
                      Math.floor(i / 6 + 1) === page && (
                        <Grid
                          item
                          className={classes.gridItem}
                          xs={12}
                          sm={6}
                          md={4}
                          key={theme.id}
                        >
                          <Link
                            to={{
                              pathname: `/themes/${theme.id}`,
                              state: { id: theme.id },
                            }}
                            id={theme.id}
                            className={classes.link}
                          >
                            <ThemeCard
                              theme={theme}
                              picture={theme.bestPicture}
                              title={theme.title}
                            />
                          </Link>
                        </Grid>
                      ),
                  )}
                </Grid>
              </div>
              <div className={classes.pageWrapper}>
                {themes.length > 6 && (
                  <Pagination
                    count={Math.ceil(themes.length / 6)}
                    page={page}
                    onChange={(e, page) => setPage(page)}
                    color="primary"
                    className={classes.pagination}
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <div
                className={isOpen ? classes.minAnimation : classes.minBefore}
              >
                <Typography className={classes.header} variant="h4">
                  テーマ一覧
                </Typography>
                <Grid container spacing={3}>
                  {themes.map(
                    (theme, i) =>
                      Math.floor(i / 6 + 1) === page && (
                        <Grid
                          item
                          className={classes.gridItem}
                          xs={12}
                          sm={6}
                          md={4}
                          key={theme.id}
                        >
                          <Link
                            to={{
                              pathname: `/themes/${theme.id}`,
                              state: { id: theme.id },
                            }}
                            id={theme.id}
                          >
                            <ThemeCard
                              theme={theme}
                              picture={theme.bestPicture}
                              title={theme.title}
                            />
                          </Link>
                        </Grid>
                      ),
                  )}
                </Grid>
              </div>
              <div className={classes.pageWrapper}>
                {themes.length > 6 && (
                  <Pagination
                    count={Math.ceil(themes.length / 6)}
                    page={page}
                    onChange={(e, page) => {
                      setPage(page);
                    }}
                    color="primary"
                    className={classes.pagination}
                  />
                )}
              </div>
            </>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default ThemeIndex;
