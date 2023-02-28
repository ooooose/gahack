import React, { useState ,useEffect, memo } from 'react';
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
    bottom: '7px',
    right: '15px',
  },
  result: {
    marginLeft: '10px',
  }
}));

const BestPictureCard = memo(({picture , user, index}) => {
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

  const shortTitle = picture.theme.title.length > 10 ?  picture.theme.title.substring(0, 10) + '...' : picture.theme.title;

  return (
      <Card className={classes.cardContent} sx={{ maxWidth: 345 }} >
        <h2>
          第 {index+1} 位
        </h2>
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
          subheader={`テーマ： ${shortTitle}`}
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
        <div>
          <p className={classes.result}>今月<strong>{picture.likes}いいね</strong>を獲得！</p>
        </div>
        <Typography className={classes.date} paragraph>{date}</Typography>
      </CardActions>
    </Card>
  );
});

export default BestPictureCard;