import React, { useState, useEffect } from "react";
import { makeStyles, Typography, Grid } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { getPictures } from "../../lib/api/pictures";
import { Pagination } from "@material-ui/lab";
import AlertMessage from "../utils/AlertMessage";
import Loader from "./Loader";
import TimelineCard from "../molecules/TimelineCard";

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
  pagination: {
    display: 'inline-block',
  },
  pageWrapper: {
    marginTop: '80px',
    marginBottom: '30px'
  }
}));

const Timeline = () => {
  const classes = useStyles();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [successMessageOpen, setSuccessMessageOpen] = useState(location.state ? (location.state.successMessageOpen) : (false));

  const handleGetPictures = async () => {
    try {
      const res = await getPictures();
      if (res.status === 200) {
        const data = res.data;
        setPictures(data);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
    setTimeout(() => { setIsOpen(true) }, 100);
  }

  useEffect(() => {
    handleGetPictures();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pictures]);

  return (
    <>
      {!loading ? (
        <>
          <div className={isOpen ? classes.animation : classes.before}>
            <Typography
              className={classes.header} 
              variant="h4">タイムライン</Typography> 
            <Grid container spacing={3}>
              {
                pictures.map((picture,i) => (
                  Math.floor(i / 6 + 1) === page && <Grid item className={classes.gridItem} xs={12} sm={6} md={4} key={picture.id}>
                    <TimelineCard picture={picture} user={picture.user}/>
                  </Grid>
                ))
              }
            </Grid>
            <AlertMessage
              open={successMessageOpen}
              setOpen={setSuccessMessageOpen}
              severity="success"
              message="ログインに成功しました"
            />
          </div>
          <div className={classes.pageWrapper}>
            {
              pictures.length > 6 && (
                <Pagination 
                  count={Math.ceil(pictures.length / 6)}
                  page={page}
                  onChange={(e, page) => { setPage(page)}}
                  color="primary"
                  className={classes.pagination}
                />
              )
            }
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default Timeline;