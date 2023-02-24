import React, { memo } from "react";
import Likes from "./Likes";
import { Typography, Card, CardContent, makeStyles, Avatar } from "@material-ui/core";
import { Link } from 'react-router-dom';
import styles from "../../css/molecules/PictureTitle.module.css";
import Bookmarks from "./Bookmarks";

const useStyles = makeStyles(() => ({
  userInfo: {
    display: 'flex',
  },
  avatar: {
    width: '50px',
    height: '50px'
  },
  userName: {
    width: '150px',
    textAlign: 'left',
    marginTop: '10px',
    marginLeft: '10px',
  },
  icons: {
    display: 'flex',
    float: 'right',
  }
}));


const PictureTitle = memo(({ user, picture, pictureId }) => {
  const classes = useStyles();
  return (
    <>
      <Card className={`${styles.pictureTitle}`} >
        <CardContent>
          <div className={classes.userInfo}>
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
            <Typography className={classes.userName}>
              {picture.user.name}さん
            </Typography>
          </div>
          <div className={classes.icons}>
            <Likes 
              picture={picture} 
              pictureId={pictureId} 
            />
            <Bookmarks 
              picture={picture} 
              pictureId={pictureId} 
            />
          </div>
        </CardContent>
      </Card>
    </>
  )
});

export default PictureTitle;