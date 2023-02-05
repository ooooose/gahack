import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Avatar, 
        Card, 
        CardActions, 
        CardContent, 
        Button, 
        Typography,
        Divider } from '@material-ui/core';
import LikeButton from '../atoms/buttons/LikeButton';
import UnLikeButton from '../atoms/buttons/UnlikeButton';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  pos: {
    marginTop: 12,
  },
  avatar: {
    width: '80px',
    height: '80px',
    textAlign: 'center',
    margin: '0 auto',
  },
  likes: {
    marginTop: '10px'
  },
  divider: {
    margin: '10px 0',
  }
});

const UserCard = ({user, avatar ,picture, likes, likeState, params, setLikeState, setLikes}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2" color='textSecondary'>
          作者
        </Typography>
        <Avatar
          alt="avatar"
          src={avatar.url}
          className={classes.avatar}
          />
        <Typography color="textSecondary">
          {user.name}
        </Typography>
        <Divider className={classes.divider} />
        <Typography className={classes.pos} color="textSecondary">
          作品詳細
        </Typography>
        <Typography variant="body2" component="p">
          本作品のテーマは
          <strong>{`${picture.theme.title}`}</strong>
          です。<br/>
          現在いいねの数は<strong>{`${likes}`}</strong>です。
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          作品にいいねする
        </Typography>
        <div className={classes.likes}>
          { likeState ? (
            <UnLikeButton 
              params={params} 
              likeState={picture.liked}
              setLikeState={setLikeState}
              likeId={picture.like_id}
              likes={likes}
              setLikes={setLikes}
            />
          ) : (
            <LikeButton 
              params={params} 
              likeState={picture.liked}
              setLikeState={setLikeState}
              likes={likes}
              setLikes={setLikes}
            />
          )}
        </div>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link
            to={{
              pathname: "/users/" + user.id,
              state: {id: user.id}
            }}
            id={user.id}>
            作者詳細
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}

export default UserCard;