import React, { useState, memo, useCallback } from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import SideBar from './SideBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  main: {
    width: '100%',
    textAlign: 'center',
    paddingTop: '50px',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));

const CommonLayout = memo(({children}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div className={classes.root}>
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideBar open={open} handleDrawerClose={handleDrawerClose} />
      <main className={classes.main}>
        <Grid>
          <Grid item>{children}</Grid>
        </Grid>
      </main>
    </div>
  );
});

export default CommonLayout;
