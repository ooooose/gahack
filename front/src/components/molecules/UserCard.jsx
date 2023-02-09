import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Avatar, 
        Card, 
        CardActions, 
        CardContent, 
        Button, 
        Typography,
        Divider } from '@material-ui/core';
import { Link } from "react-router-dom";
import Likes from './Likes';
import { AuthContext } from '../../App';

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
    margin: '10px auto',
  },
  divider: {
    margin: '10px 0',
  },
  description: {
    marginBottom: '10px'
  }
});

const UserCard = ({user, avatar ,picture, theme, likes}) => {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);

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
        <Typography className={classes.description} variant="body2" component="p">
          本作品のテーマは
          <strong>{`${theme.title}`}</strong>
          です。<br/>
          現在いいねの数は<strong>{`${likes}`}</strong>です。
        </Typography>
        <Likes 
          picture={picture} 
          pictureId={picture.id} />   
      </CardContent>
      { currentUser.email !== "guest@example.com" ? (
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
      ) : (
        <></>
      )}
    </Card>
  );
}

export default UserCard;