import React, { memo } from 'react';
import { Card, CardContent, Avatar, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  avatar: {
    width: '60px',
    height: '60px',
    margin: '0 auto',
  },
  avatarContent: {
    margin: '0 auto',
  },
  cardContent: {
    position: 'relative',
  },
  cardBottom: {
    marginTop: '10px',
  },
  link: {
    display: 'inline-block',
  },
}));

const BestUserCard = memo(({ user, index }) => {
  const classes = useStyles();
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <h2>第 {index + 1} 位</h2>
        <div className={classes.avatarContent}>
          <Link
            to={{
              pathname: `/users/${user.id}`,
              state: { id: user.id },
            }}
            id={user.id}
            className={classes.link}
          >
            <Avatar
              sx={{ bgcolor: 'red' }}
              alt="avatar"
              src={user.image.url}
              className={classes.avatar}
            />
          </Link>
        </div>
        <p>
          <strong>{user.name}</strong>さん
        </p>
        <p>
          今月<strong>{user.monthlyLikes}いいね</strong>を獲得！
        </p>
      </CardContent>
    </Card>
  );
});

export default BestUserCard;
