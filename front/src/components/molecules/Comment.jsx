import React from "react";

import { makeStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { Avatar, ListItemAvatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  inline: {
    display: "inline",
  },
  margin: {
    margin: theme.spacing(1, 1, 0, 2),
  },
}));

const Comment = ({ comment, user }) => {
  const classes = useStyles();
  return (
    <>
    <ListItem alignItems="flex-start">
          <ListItemAvatar>
          <Avatar
            alt="avatar"
            src={user.image.url}
            className={classes.avatar}
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {user.name}
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textSecondary"
                >
                  {/* {moment(created_at).fromNow()} */}
                </Typography>
              </>
            }
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body1"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {comment.body}
                </Typography>
                <br />
              </>
            }
          />
        </ListItem>
        <Divider variant="inset" />
    </>
  )
}

export default Comment;