import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '100px',
  },
  notFound: {
    fontSize: '50px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  }
}));

const NotFound = () => {
  const classes = useStyles();
  return(
    <>
      <div>
        <h1 className={classes.notFound}>404</h1>
        <h3>お探しのページは見つかりませんでした。</h3>
        <Button color="primary" variant="contained" >
          <Link to="/" className={classes.link} >
            ホームに戻る
          </Link>
        </Button>
      </div>
    </>
  )
}

export default NotFound;