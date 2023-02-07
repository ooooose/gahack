import React from "react";
import { makeStyles, Typography, Divider } from "@material-ui/core";
import Comment from "../molecules/Comment";


const useStyles = makeStyles((theme) => ({
  Box: {
    marginTop: '25px',
  },
  titleWrapper: {
    textAlign: 'left',
    padding: '10px',
  },
  commentsBox: {
    height: '70vh',
    overflow: 'auto',
  }
}));

const Comments = ({comments, setComments}) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.Box}>
        <div className={classes.titleWrapper}>
          <Typography
            component="span"
            variant="h5"
            color="textPrimary"
          >コメント一覧</Typography>
        </div>
        <Divider />
        { comments.length > 0 ? (
          <div className={classes.commentsBox}>
            {comments.map((comment) => (
              <div key={comment.id}>
                <Comment
                  comments={comments}
                  comment={comment} 
                  commentId={comment.id}
                  user={comment.user}
                  picture={comment.picture}
                  setComments={setComments} />
              </div>
            ))}
          </div>
        ) : (
          <h3>まだコメントはありません</h3>
        )}
      </div>
    </>
  )
}

export default Comments;