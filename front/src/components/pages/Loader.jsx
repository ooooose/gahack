import React from "react";
import { makeStyles } from "@material-ui/core";
import { Puff } from 'react-loader-spinner';

const useStyles = makeStyles((theme) => ({
  loading: {
    margin: "0 auto",
    position: 'fixed',
    top: "50%",
    left: '50%',
  },
}));


const Loader = () => {
  const classes = useStyles();
  return (
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
  )
}

export default Loader;