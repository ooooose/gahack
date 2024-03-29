import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Card,
  Divider,
  CardContent,
  Avatar,
  Tooltip,
  IconButton,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import { ImTwitter } from 'react-icons/im';
import { TwitterShareButton } from 'react-share';
import { FaRegComment } from 'react-icons/fa';
import { showPicture, deletePicture } from '../../lib/api/pictures';
import Picture from '../atoms/picture/Picture';
import styles from '../../css/components/Frames.module.css';
import Loader from './Loader';
import EditFrameModal from '../molecules/EditFrameModal';
import AuthContext from '../../context';
import DeletePicutreButton from '../atoms/buttons/DeletePictureButton';
import Likes from '../molecules/Likes';
import Bookmarks from '../molecules/Bookmarks';
import CommentsModal from '../molecules/CommentsModal';
import AlertMessage from '../utils/AlertMessage';

const useStyles = makeStyles(() => ({
  animation: {
    transition: '1s',
    opacity: '1',
  },
  before: {
    opacity: '0',
  },
  textField: {
    marginTop: '20px',
    textAlign: 'center',
  },
  container: {
    maxWidth: '450px',
    margin: '0 auto',
  },
  avatar: {
    width: '60px',
    height: '60px',
    float: 'right',
  },
  card: {
    margin: '20px auto',
    width: '350px',
  },
  pictureTheme: {
    textAlign: 'left',
  },
  information: {
    padding: '15px 50px',
    margin: '0 auto',
  },
  userInfo: {
    width: '100%',
    display: 'flex',
  },
  pictureTitle: {
    width: '240px',
  },
  divider: {
    margin: '10px 10px',
  },
  profile: {
    marginTop: '30px',
    marginRight: '30px',
  },
  cardBottom: {
    display: 'flex',
    flexDirection: 'column',
    float: 'right',
  },
  icons: {
    display: 'flex',
    margin: '0 auto',
  },
  setting: {
    cursor: 'pointer',
    color: 'gray',
    padding: '3px',
  },
  datePos: {
    margin: '5px 5px 10px',
    textAlign: 'right',
  },
  length: {
    fontSize: '14px',
    marginLeft: '2px',
  },
  twitter: {
    color: '#1DA1F2',
  },
}));

function ShowPicture() {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [picture, setPicture] = useState([]);
  const [theme, setTheme] = useState([]);
  const [user, setUser] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentOpen, setCommentOpen] = useState(false);
  const [date, setDate] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [successMessageOpen, setSuccessMessageOpen] = useState(
    location.state ? location.state.successMessageOpen : false,
  );

  const handleToDate = (d) => {
    const target = new Date(d);
    let PostDate;
    if (target.getMinutes() < 10) {
      PostDate = `${target.getFullYear()}/${
        (target.getMonth() % 12) + 1
      }/${target.getDate()} ${target.getHours()}:0${target.getMinutes()}`;
    } else {
      PostDate = `${target.getFullYear()}/${
        (target.getMonth() % 12) + 1
      }/${target.getDate()} ${target.getHours()}:${target.getMinutes()}`;
    }
    setDate(PostDate);
  };

  const handleShowPicture = async () => {
    try {
      const res = await showPicture(id);
      if (res.status === 200) {
        const { data } = res;
        setPicture(data);
        setUser(data.user);
        setComments(data.comments);
        setTheme(data.theme);
        handleToDate(data.createdAt);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
    setTimeout(() => {
      setIsOpen(true);
    }, 200);
  };

  const handleDeletePicture = useCallback(async () => {
    if (window.confirm('削除しますか？')) {
      try {
        const res = await deletePicture(id);
        if (res.status === 200) {
          navigate(`/themes/${theme.id}`);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [id, theme.id, navigate]);

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    handleShowPicture();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className={isOpen ? classes.animation : classes.before}>
            <div className={classes.container}>
              <div className={`${styles.ShowPictureParent}`}>
                <Picture
                  picture={picture}
                  theme={theme}
                  image={picture.image}
                />
              </div>
              <Card className={classes.card}>
                <CardContent>
                  <div className={classes.userInfo}>
                    <div className={classes.pictureTheme}>
                      <Typography sx={{ fontSize: 14 }} gutterBottom>
                        作品のテーマ
                      </Typography>
                      {theme.title.length > 10 ? (
                        <Tooltip title={theme.title}>
                          <Typography
                            className={classes.pictureTitle}
                            variant="h6"
                            component="div"
                          >
                            {`${theme.title.substring(0, 10)}...`}
                          </Typography>
                        </Tooltip>
                      ) : (
                        <Typography
                          className={classes.pictureTitle}
                          variant="h6"
                          component="div"
                        >
                          {theme.title}
                        </Typography>
                      )}
                    </div>
                    {user.name === 'ゲストユーザー' ? (
                      <Tooltip title={`${user.name}`}>
                        <Avatar
                          sx={{ bgcolor: 'red' }}
                          alt="avatar"
                          src={user.image.url}
                          className={classes.avatar}
                        />
                      </Tooltip>
                    ) : (
                      <Link
                        to={{
                          pathname: `/users/${user.id}`,
                          state: { id: user.id },
                        }}
                        id={picture.id}
                        className={classes.link}
                      >
                        <Tooltip title={`${user.name}`}>
                          <Avatar
                            sx={{ bgcolor: 'red' }}
                            alt="avatar"
                            src={user.image.url}
                            className={classes.avatar}
                          />
                        </Tooltip>
                      </Link>
                    )}
                  </div>
                  <Divider className={classes.divider} />
                  <div className={classes.cardBottom}>
                    <div className={classes.icons}>
                      <Likes picture={picture} pictureId={picture.id} />
                      <Bookmarks picture={picture} pictureId={picture.id} />
                      <Tooltip title="コメント" className={classes.comment}>
                        <IconButton
                          aria-label="setting"
                          onClick={() => setCommentOpen(true)}
                        >
                          <FaRegComment />
                          <span className={classes.length}>
                            {comments.length}
                          </span>
                        </IconButton>
                      </Tooltip>
                      <CommentsModal
                        commentOpen={commentOpen}
                        setCommentOpen={setCommentOpen}
                        pictureId={picture.id}
                        comments={comments}
                        setComments={setComments}
                      />
                      {currentUser.id === user.id &&
                      user.name !== 'ゲストユーザー' ? (
                        <>
                          <Tooltip title="フレーム変更">
                            <IconButton
                              aria-label="setting"
                              onClick={handleOpen}
                            >
                              <SettingsIcon className={classes.setting} />
                            </IconButton>
                          </Tooltip>
                          <DeletePicutreButton
                            handleDeletePicture={handleDeletePicture}
                          />
                          <Tooltip title="Twitterシェア">
                            <IconButton aria-label="twitter">
                              <TwitterShareButton
                                title="画伯が現れました！絵を覗いてみましょう！"
                                url={`https://gahack.net/pictures/${picture.id}/twitter`}
                                hashtags={['画HACK']}
                              >
                                <ImTwitter className={classes.twitter} />
                              </TwitterShareButton>
                            </IconButton>
                          </Tooltip>
                        </>
                      ) : (
                        <></>
                      )}
                      <EditFrameModal
                        open={open}
                        setOpen={setOpen}
                        picture={picture}
                        setPicture={setPicture}
                        image={picture.image}
                        setTheme={setTheme}
                      />
                    </div>
                    <Typography className={classes.datePos} variant="body2">
                      {date}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </div>
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
  );
}

export default ShowPicture;
