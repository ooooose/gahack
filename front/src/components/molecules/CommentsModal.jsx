import React, { useState, useContext, memo } from "react";
import { makeStyles, Typography, Divider, TextField, Button, Modal, useMediaQuery } from "@material-ui/core";
import Comment from "./Comment";
import { createComment } from '../../lib/api/comments';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../../App";
import { signOut } from "../../lib/api/auth";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: '55%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: '60vh',
    paddingBottom: '120px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: 24,
    padding: '18px',
    borderRadius: '6px',
  },
  minPaper: {
    position: 'absolute',
    top: '55%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '300px',
    height: '60vh',
    paddingBottom: '120px',
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
  registerButton: {
    width: '150px'
  },
  text: {
    textAlign: 'center',
  },
  cancelButton: {
    marginRight: '5px',
  },
  guest: {
    textAlign: 'center'
  },
}));

const CommentsModal = memo(({commentOpen, setCommentOpen, pictureId, comments, setComments}) => {
  const { currentUser, setIsSignedIn } = useContext(AuthContext);
  const classes = useStyles();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const matches = useMediaQuery('(min-width:575px)');

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

  const handleSignOut = async (e) => {
    try {
      const res = await signOut();

      if (res.data.success === true) {
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        navigate("/signup");

        console.log("Succeeded in sign out");
      } else {
        console.log("Failed in sign out");
      }
    } catch (e) {
      console.log(e);
    }
  }

  const body = (
    <>
      {matches ? (
        <>
          <div className={classes.minPaper}>
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
            <Divider />
            {currentUser.name !== "ゲストユーザー" ? (
              <>
                <div className={classes.textField}>
                  <TextField
                    label="コメント"
                    type="text"
                    name="body"
                    margin="normal"
                    fullWidth
                    onChange={(event) => setComment(event.target.value)}
                    value={comment}
                  />
                  <div className={classes.buttons}>
                    <Button 
                      variant="contained" 
                      onClick={() => setCommentOpen(false)} 
                      className={classes.cancelButton}>閉じる</Button>
                    <Button 
                      className={classes.button}
                      variant="contained" 
                      color="primary"
                      onClick={handleCommentSubmit}
                      disabled={!comment ? true : false}
                    >投稿する</Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={classes.guest}>
                  <h3>ゲストユーザーの方はコメントできません</h3>
                  <div className={classes.buttons}>
                    <Button 
                      variant="contained" 
                      onClick={() => setCommentOpen(false)} 
                      className={classes.cancelButton}>キャンセル</Button>
                    <Button className={classes.registerButton} color="primary" variant="contained" onClick={handleSignOut}>
                      ユーザー登録へ
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
        ) : (
        <>
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
            <Divider />
            {currentUser.name !== "ゲストユーザー" ? (
              <>
                <div className={classes.textField}>
                  <TextField
                    label="コメント"
                    type="text"
                    name="body"
                    margin="normal"
                    fullWidth
                    onChange={(event) => setComment(event.target.value)}
                    value={comment}
                  />
                  <div className={classes.buttons}>
                    <Button 
                      variant="contained" 
                      onClick={() => setCommentOpen(false)} 
                      className={classes.cancelButton}>閉じる</Button>
                    <Button 
                      className={classes.button}
                      variant="contained" 
                      color="primary"
                      onClick={handleCommentSubmit}
                      disabled={!comment ? true : false}
                    >投稿する</Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={classes.guest}>
                  <h3>ゲストユーザーの方はコメントできません</h3>
                  <div className={classes.buttons}>
                    <Button 
                      variant="contained" 
                      onClick={() => setCommentOpen(false)} 
                      className={classes.cancelButton}>キャンセル</Button>
                    <Button className={classes.registerButton} color="primary" variant="contained" onClick={handleSignOut}>
                      ユーザー登録へ
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
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
});

export default CommentsModal;
