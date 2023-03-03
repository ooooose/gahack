import React from "react";
import { makeStyles, useMediaQuery } from "@material-ui/core";
import { Puff } from 'react-loader-spinner';

const useStyles = makeStyles((theme) => ({
  loading: {
    margin: "0 auto",
    position: 'fixed',
    top: "50%",
    left: '50%',
  },
  minLoading: {
    margin: "0 auto",
    position: 'fixed',
    top: "50%",
    left: '35%',
  },
}));

const Loader = () => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:575px)');
  return (
    <>
    {matches ? (
      <>
        <div className={classes.loading}>
          <Puff
            type="Puff"
            color="#00BFFF"
            width={100}
            height={100}
            radius={1}
            ariaLabel="loading"
          />
        </div>
      </>
    ) : (
      <>
        <div className={classes.minLoading}>
          <Puff
            type="Puff"
            color="#00BFFF"
            width={100}
            height={100}
            radius={1}
            ariaLabel="loading"
          />
        </div>
      </>
    )}
    </>
  )
}

export default Loader;