import React, { useState, useEffect, memo } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  makeStyles,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Likes from './Likes';
import Bookmarks from './Bookmarks';
import Picture from '../atoms/picture/Picture';
import styles from '../../css/components/Frames.module.css';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: '60px',
    height: '60px',
  },
  cardContent: {
    position: 'relative',
  },
  cardBottom: {
    marginTop: '10px',
  },
  date: {
    position: 'absolute',
    bottom: '5px',
    right: '15px',
  },
  icons: {
    display: 'flex',
  },
  minCardBottom: {
    marginTop: '10px',
    flexDirection: 'column',
  },
  minCardContent: {
    width: '300px',
    margin: '0 auto',
  },
}));

const TimelineCard = memo(({ picture, user }) => {
  const classes = useStyles();
  const [date, setDate] = useState([]);
  const matches = useMediaQuery('(min-width:575px)');
  const handleToDate = (date) => {
    date = new Date(date);
    if (date.getMinutes() < 10) {
      date = `${date.getFullYear()}/${
        (date.getMonth() % 12) + 1
      }/${date.getDate()} ${date.getHours()}:0${date.getMinutes()}`;
    } else {
      date = `${date.getFullYear()}/${
        (date.getMonth() % 12) + 1
      }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    }
    setDate(date);
  };
  const shortTitle =
    picture.theme.title.length > 10
      ? `${picture.theme.title.substring(0, 10)}...`
      : picture.theme.title;

  useEffect(() => {
    handleToDate(picture.createdAt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {matches ? (
        <Card className={classes.cardContent} sx={{ maxWidth: 345 }}>
          <CardHeader
            align="left"
            avatar={
              <>
                {user.name !== 'ゲストユーザー' ? (
                  <Link
                    to={{
                      pathname: `/users/${user.id}`,
                      state: { id: user.id },
                    }}
                    id={picture.id}
                    className={classes.link}
                  >
                    <Avatar
                      sx={{ bgcolor: 'red' }}
                      alt="avatar"
                      src={user.image.url}
                      className={classes.avatar}
                    />
                  </Link>
                ) : (
                  <Avatar
                    sx={{ bgcolor: 'red' }}
                    alt="avatar"
                    src={user.image.url}
                    className={classes.avatar}
                  />
                )}
              </>
            }
            action={<IconButton aria-label="settings" />}
            title={user.name}
            subheader={`テーマ： ${shortTitle}`}
          />
          <CardContent className={`${styles.timeParent}`}>
            <Link
              to={{
                pathname: `/pictures/${picture.id}`,
                state: { id: picture.id },
              }}
              id={picture.id}
              className={classes.link}
            >
              <Picture
                picture={picture}
                theme={picture.theme}
                image={picture.image}
              />
            </Link>
          </CardContent>
          <CardActions className={classes.cardBottom} disableSpacing>
            <div className={classes.icons}>
              <Likes picture={picture} pictureId={picture.id} />
              <Bookmarks picture={picture} pictureId={picture.id} />
            </div>
            <Typography className={classes.date} paragraph>
              {date}
            </Typography>
          </CardActions>
        </Card>
      ) : (
        <Card className={classes.minCardContent} sx={{ maxWidth: 345 }}>
          <CardHeader
            align="left"
            avatar={
              <>
                {user.name !== 'ゲストユーザー' ? (
                  <Link
                    to={{
                      pathname: `/users/${user.id}`,
                      state: { id: user.id },
                    }}
                    id={picture.id}
                    className={classes.link}
                  >
                    <Avatar
                      sx={{ bgcolor: 'red' }}
                      alt="avatar"
                      src={user.image.url}
                      className={classes.avatar}
                    />
                  </Link>
                ) : (
                  <Avatar
                    sx={{ bgcolor: 'red' }}
                    alt="avatar"
                    src={user.image.url}
                    className={classes.avatar}
                  />
                )}
              </>
            }
            action={<IconButton aria-label="settings" />}
            title={user.name}
            subheader={`テーマ： ${shortTitle}`}
          />
          <CardContent className={`${styles.timeParent}`}>
            <Link
              to={{
                pathname: `/pictures/${picture.id}`,
                state: { id: picture.id },
              }}
              id={picture.id}
              className={classes.link}
            >
              <Picture
                picture={picture}
                theme={picture.theme}
                image={picture.image}
              />
            </Link>
          </CardContent>
          <CardActions className={classes.minCardBottom} disableSpacing>
            <div className={classes.icons}>
              <Likes picture={picture} pictureId={picture.id} />
              <Bookmarks picture={picture} pictureId={picture.id} />
            </div>
            <Typography className={classes.minDate} paragraph>
              {date}
            </Typography>
          </CardActions>
        </Card>
      )}
    </>
  );
});

export default TimelineCard;
