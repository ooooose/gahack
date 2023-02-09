import React, { useContext } from "react";
import { AuthContext } from "../../App";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { Avatar, ListItemAvatar, Grid } from "@material-ui/core";
import { deleteComment } from "../../lib/api/comments";
import DeleteCommentButton from "../atoms/buttons/DeleteCommentButton";

const useStyles = makeStyles((theme) => ({
  inline: {
    display: "inline",
  },
  margin: {
    margin: theme.spacing(1, 1, 0, 2),
  },
}));

const Comment = ({ comments, comment, commentId, user, picture, setComments }) => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  const handleDeleteComment = async () => {
    if (window.confirm("削除しますか？")) {
      try {
        const res = await deleteComment(picture.id, commentId)
        if (res.status === 200) {
          const newComments = comments.filter((comment) => {
            return comment.id !== commentId
          });
          setComments(newComments);
        }
      } catch(e) {
        console.log(e);
      }
    }
  }
  return (
    <>
    <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Link
              to={{
                pathname: "/users/" + user.id,
                state: {id: user.id}
              }}
              id={user.id}>
              <Avatar
                alt="avatar"
                src={user.image.url}
                className={classes.avatar}
                />
            </Link>
          </ListItemAvatar>
          <Grid container>
            <Grid item xs={10} >
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
            </Grid>
            <Grid item xs={2}>
              { currentUser.id === user.id ? (
                <DeleteCommentButton handleDeleteComment={handleDeleteComment} />
                ) : (
                  <></>
                  ) }
            </Grid>
          </Grid>
        </ListItem>
        <Divider variant="inset" />
    </>
  )
}

export default Comment;