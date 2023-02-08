import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { showPicture } from '../../lib/api/pictures';
import { Grid, TextField, Button, Tooltip, IconButton } from "@material-ui/core";
import Picture from '../atoms/picture/Picture';
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../css/components/Frames.module.css";
import { createComment } from '../../lib/api/comments';
import Comments from '../organisms/Comments';
import Loader from './Loader';
import EditFrameModal from '../molecules/EditFrameModal';
import { AuthContext } from '../../App';
import UserCard from '../molecules/UserCard';
import SettingsIcon from '@material-ui/icons/Settings';
import { ImTwitter } from 'react-icons/im';
import { Helmet } from 'react-helmet';
import { TwitterShareButton } from "react-share";

const useStyles = makeStyles((theme) => ({
  animation: {
    transition: '1s',
    opacity: '1',
    margin: '25px 40px 0px 80px'
  },
  before: {
    opacity: '0',
    margin: '20px 40px 0px 80px'
  },
  textField: {
    paddingRight: '40px',
    paddingLeft: '40px',
  },
  buttons: {
    paddingTop: '5px',
    float: 'right',
  },
  button: {
    width: '120px'
  },
  info: {
    textAlign: 'left',
    paddingTop: '80px',
  },
  profile: {
    marginTop: '30px',
    marginRight: '30px',
  },
  editFrame: {
    marginTop: '30px',
    marginRight: '50px',
    textAlign: 'right',
  },
  setting: {
    cursor: "pointer",
    color: 'gray',
    padding: '3px'
  },
}));

const ShowPicture = () => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  const { id } = useParams();
  const [picture, setPicture] = useState([]);
  const [theme, setTheme] = useState([]);
  const [user, setUser] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [likeState, setLikeState] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  
  const handleShowPicture = async () => {
    try {
      const res = await showPicture(id);
      if (res.status === 200) {
        const data = res.data;
        setPicture(data);
        setUser(data.user);
        setLikeState(data.liked);
        setLikes(data.likes);
        setComments(data.comments);
        setTheme(data.theme);
        setAvatar(data.user.image);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
    setTimeout(() => { setIsOpen(true) }, 200)
  };

  const generateCommentParams = () => {
    const createCommentParams = {
      body: comment,
      picture_id: id
    };
    return createCommentParams;
  };

  const handleCommentSubmit = async (e) => {
    const params = generateCommentParams();
    try {
      const res = await createComment(params, id);
      console.log(res);
      setComments([res.data, ...comments])
      setComment("");
    } catch (e) {
      console.log(e);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const generateParams = () => {
    const likeParams = {
      picture_id: id,
    };
    return likeParams;
  };

  useEffect(() => {
    handleShowPicture();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!loading ? (
        <div className={isOpen ? classes.animation : classes.before}>
          <Helmet
            meta={[
              { name: 'twitter:card', content: 'summary_large_image' },
              { name: 'twitter:image', content: picture.twitterCard.url },
              { name: 'twitter:title', content: '画HACK' },
              { name: 'twitter:description', content: 'この絵のテーマはなんでしょう？' },
            ]}
          />
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Comments comments={comments} setComments={setComments} />
            </Grid>
            <Grid item xs={4}>
              <div className={`${styles.parent}`}>
                <Picture 
                  picture={picture} 
                  theme={theme} 
                  image={picture.image}
                  />
              </div>
              <div className={classes.editFrame}>
                { currentUser.id === user.id ? (
                  <>
                    { picture.twitterCard.url !== null ? (
                      <>
                        <Tooltip title="Twitterシェア">
                          <IconButton aria-label="twitter">
                            <TwitterShareButton
                              url={`${process.env.REACT_APP_API}`}
                              hashtags={["画HACK"]}
                            >
                              <ImTwitter />
                            </TwitterShareButton>
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : (
                      <>
                      </>
                    )}
                    <Tooltip title="フレーム変更">
                      <IconButton aria-label="setting" onClick={handleOpen}>
                        <SettingsIcon
                          className={classes.setting} />
                      </IconButton>
                    </Tooltip>
                  </>
                ) : (
                  <></>
                ) }
                <EditFrameModal 
                  open={open} 
                  setOpen={setOpen} 
                  picture={picture} 
                  setPicture={setPicture} 
                  image={picture.image}
                  setTheme={setTheme} />     
              </div>
              { currentUser.email === "guest@example.com" ? (
                <></>
              ) : (
                <>
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
                        className={classes.button}
                        variant="contained" 
                        color="primary"
                        onClick={handleCommentSubmit}
                        disabled={!comment ? true : false}
                        >投稿する</Button>
                    </div>
                  </div>
                </>  
              ) }
            </Grid>
            <Grid item xs={4}>
              <div className={classes.profile}>
                <UserCard 
                  user={user}
                  picture={picture}
                  theme={theme}
                  avatar={avatar}
                  likes={likes}
                  likeState={likeState}
                  params={generateParams()} 
                  setLikeState={setLikeState}
                  setLikes={setLikes}
                />
              </div>
            </Grid>
          </Grid>
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
};

export default ShowPicture;