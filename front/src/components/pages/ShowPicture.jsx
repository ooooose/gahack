import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
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
import { deletePicture } from '../../lib/api/pictures';
import DeletePicutreButton from '../atoms/buttons/DeletePictureButton';
import AlertMessage from '../utils/AlertMessage';

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
  profile: {
    marginTop: '30px',
    marginRight: '30px',
  },
  editFrame: {
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
  const location = useLocation();
  const navigate = useNavigate();
  const [picture, setPicture] = useState([]);
  const [theme, setTheme] = useState([]);
  const [user, setUser] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [successMessageOpen, setSuccessMessageOpen] = useState(location.state ? (location.state.successMessageOpen) : (false));

  const handleShowPicture = async () => {
    try {
      const res = await showPicture(id);
      if (res.status === 200) {
        const data = res.data;
        setPicture(data);
        setUser(data.user);
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

  const handleDeletePicture = async () => {
    if (window.confirm('削除しますか？')){
      try {
        const res = await deletePicture(id);
        if (res.status === 200) {
          navigate(`/themes/${theme.id}`)
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    handleShowPicture();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className={isOpen ? classes.animation : classes.before}>
            <Helmet
              meta={[
                { property: 'og:url', content: `https://gahack.netlify.app/pictures/${picture.id}/twitter` },
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
                { user.email === "guest@example.com" ? (
                  <></>
                ) : (
                  <>
                  
                    <div className={classes.editFrame}>
                      { currentUser.id === user.id ? (
                        <>
                          { picture.twitterCard.url !== null ? (
                            <>
                              <Tooltip title="Twitterシェア">
                                <IconButton aria-label="twitter">
                                  <TwitterShareButton
                                    url={`${process.env.REACT_APP_FRONT}/pictures/${picture.id}/twitter`}
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
                          <DeletePicutreButton handleDeletePicture={handleDeletePicture}/>
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
                  </>
                ) }
                { currentUser.email === "guest@example.com" ? (
                  <>
                    <p>※ゲストユーザーの方はコメントできません</p>
                  </>
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
                  />
                </div>
              </Grid>
            </Grid>
          </div>
          <AlertMessage
          open={successMessageOpen}
          setOpen={setSuccessMessageOpen}
          severity="success"
          message="絵を作成しました"
        />
      </>
      ) : (
        <Loader />
      )}
    </>
  )
};

export default ShowPicture;
