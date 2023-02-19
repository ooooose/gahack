import React, { useState ,useEffect } from 'react';
import {Card, 
        CardHeader, 
        CardContent, 
        CardActions,
        Avatar,
        IconButton,
        makeStyles,
        Typography,
        } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Likes from './Likes';
import Bookmarks from './Bookmarks';
import Picture from '../atoms/picture/Picture';
import styles from '../../css/components/Frames.module.css';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "60px",
    height: '60px'
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
    display: 'flex'
  }
}));

const TimelineCard = ({picture , user}) => {
  const classes = useStyles();
  const [date, setDate] = useState([]);
  const handleToDate = (date) =>{
    date = new Date(date);
    if(date.getMinutes() < 10){
      date = date.getFullYear()+"/"+(date.getMonth()%12+1)+"/"+date.getDate()+" "+date.getHours()+":0"+date.getMinutes()
    } else {
      date = date.getFullYear()+"/"+(date.getMonth()%12+1)+"/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()
    }
    setDate(date) 
  }

  useEffect(() => {
    handleToDate(picture.createdAt);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className={classes.cardContent} sx={{ maxWidth: 345 }} >
        <CardHeader
          align='left'
          avatar={
            (
              <>
              { user.name !== "ゲストユーザー" ? (
                  <Link to={{
                    pathname: "/users/" + user.id,
                    state: {id: user.id}
                  }}
                  id={picture.id}
                  className = {classes.link}
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
            )
          }
          action={
            <IconButton aria-label="settings">
            </IconButton>
          }
          title={user.name}
          subheader={`テーマ： ${picture.theme.title}`}
        />
      <CardContent className={`${styles.timeParent}`}>
        <Link to={{
                    pathname: "/pictures/" + picture.id,
                    state: {id: picture.id}
                  }}
                  id={picture.id}
                  className = {classes.link}
                  >
          <Picture 
            picture={picture} 
            theme={picture.theme} 
            image={picture.image} />
        </Link>
      </CardContent>
      <CardActions className={classes.cardBottom} disableSpacing>
        <div className={classes.icons}>
          <Likes picture={picture} pictureId={picture.id} />
          <Bookmarks picture={picture} pictureId={picture.id} />
        </div>
        <Typography className={classes.date} paragraph>{date}</Typography>
      </CardActions>
    </Card>
  );
}

export default TimelineCard;
