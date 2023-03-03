import React, { useContext, memo } from "react";
import {makeStyles,
        ListItem, 
        Divider, 
        Typography, 
        Avatar, 
        ListItemAvatar, 
        Grid,
        useMediaQuery} from "@material-ui/core";
import { Link } from "react-router-dom";
import Relationships from "./Relationships";
import { AuthContext } from "../../App";

const useStyles = makeStyles((theme) => ({
  inline: {
    display: "inline",
  },
  margin: {
    margin: theme.spacing(1, 1, 0, 2),
  },
  avatar: {
    width: '70px',
    height: '70px',
  },
  link: {
    textDecoration: 'none',
    lineHeight: '70px',
    paddingLeft: '20px'
  },
}));

const Follower = memo(({ follower, handleShowUser }) => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:575px)');
  const { currentUser } = useContext(AuthContext);
  return (
    <>
    {matches ? (
      <>
        <ListItem alignItems="flex-start">
          <Link
            to={{
              pathname: "/users/" + follower.id,
              state: {id: follower.id}
            }}
            onClick={handleShowUser(follower.id)}
            id={follower.id}>
            <ListItemAvatar>
              <Avatar
                alt="avatar"
                src={follower.image.url}
                className={classes.avatar}
                />
            </ListItemAvatar>
          </Link>
          <Grid container>
            <Grid item xs={8} >
              <Link
                className={classes.link}
                to={{
                  pathname: "/users/" + follower.id,
                  state: {id: follower.id}
                }}
                onClick={handleShowUser(follower.id)}
                id={follower.id}
              >
                <Typography
                  component="span"
                  variant="body1"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {follower.name}
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={4}>
              { currentUser.id !== follower.id ? (
                  <Relationships 
                    user={follower}
                    userId={follower.id} 
                    />
                ) : (
                  <></>
              ) }
            </Grid>
          </Grid>
        </ListItem>
        <Divider variant="inset" />
      </>
      ) : (
        <>
        <ListItem alignItems="flex-start">
          <Link
            to={{
              pathname: "/users/" + follower.id,
              state: {id: follower.id}
            }}
            onClick={handleShowUser(follower.id)}
            id={follower.id}>
            <ListItemAvatar>
              <Avatar
                alt="avatar"
                src={follower.image.url}
                className={classes.avatar}
                />
            </ListItemAvatar>
          </Link>
          <Grid container>
            <Grid item xs={6} >
              <Link
                className={classes.link}
                to={{
                  pathname: "/users/" + follower.id,
                  state: {id: follower.id}
                }}
                onClick={handleShowUser(follower.id)}
                id={follower.id}
              >
                <Typography
                  component="span"
                  variant="body1"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {follower.name}
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={6}>
              { currentUser.id !== follower.id ? (
                  <Relationships 
                    user={follower}
                    userId={follower.id} 
                    />
                ) : (
                  <></>
              ) }
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
      </>
    )}
    </>
  )
});

export default Follower;
