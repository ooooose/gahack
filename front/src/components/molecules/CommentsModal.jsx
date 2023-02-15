import React, { useState } from "react";
import { makeStyles, Typography, Divider, TextField, Button, Modal } from "@material-ui/core";
import Comment from "./Comment";
import { createComment } from '../../lib/api/comments';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: '55%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: '500px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: 24,
    padding: '18px',
    borderRadius: '6px',
  },
  titleWrapper: {
    textAlign: 'left',
    padding: '10px',
  },
  textField: {
    marginTop: '10px',
  },
  commentsBox: {
    height: '48vh',
    overflow: 'auto',
  },
  buttons: {
    paddingTop: '5px',
    float: 'right',
  },
  button: {
    width: '120px'
  },
  text: {
    textAlign: 'center',
  },
  cancelButton: {
    marginRight: '5px',
  },
}));

const CommentsModal = ({commentOpen, setCommentOpen, pictureId, comments, setComments}) => {
  const classes = useStyles();
  const [comment, setComment] = useState("");

  const generateCommentParams = () => {
    const createCommentParams = {
      body: comment,
      picture_id: pictureId,
    };
    return createCommentParams;
  };
  
  const handleCommentSubmit = async (e) => {
    const params = generateCommentParams();
    try {
      const res = await createComment(params, pictureId);
      setComments([res.data, ...comments])
      setComment("");
    } catch (e) {
      console.log(e);
    }
  };

  const body = (
    <div className={classes.paper}>
      <div className={classes.titleWrapper}>
        <Typography
          component="span"
          variant="h5"
          color="textPrimary"
        >コメント一覧</Typography>
      </div>
      <Divider />
      <div>
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
          <div className={classes.commentsBox}>
            <h3 className={classes.text}>まだコメントはありません</h3>
          </div>
        )}
      </div>
      <div className={classes.textField}>
        <TextField
          label="コメント"
          type="text"
          name="body"
          margin="normal"
          fullWidth
          multiline
          onChange={(event) => setComment(event.target.value)}
          value={comment}
        />
        <div className={classes.buttons}>
          <Button 
            variant="contained" 
            onClick={() => setCommentOpen(false)} 
            className={classes.cancelButton}>キャンセル</Button>
          <Button 
            className={classes.button}
            variant="contained" 
            color="primary"
            onClick={handleCommentSubmit}
            disabled={!comment ? true : false}
          >投稿する</Button>
        </div>
      </div>
    </div>
  )
  
  return (
    <>
      <Modal
        open={commentOpen}
        className={classes.modal}
        onClose={() => setCommentOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  )
}

export default CommentsModal;