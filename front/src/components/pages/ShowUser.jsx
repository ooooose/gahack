import React, { useState, useEffect } from "react";
import { showUser } from "../../lib/api/users";

import {Grid,
        makeStyles,
        Typography,
        Avatar,
        Tab,
        Tabs,
        Box,
        Button,
        Container,
        useMediaQuery } from "@material-ui/core";

import PropTypes from 'prop-types';
import Picture from "../atoms/picture/Picture";
import PictureCard from "../atoms/cards/PictureCard";
import { useParams, Link, useLocation } from "react-router-dom";
import styles from "../../css/components/Frames.module.css"
import { useContext } from "react";
import { AuthContext } from "../../App";
import EditUserModal from "../molecules/EditUserModal";
import { Pagination } from "@material-ui/lab";
import Relationships from "../molecules/Relationships";
import Loader from "./Loader";
import Following from "../molecules/Following";
import Follower from "../molecules/Follower";
import AlertMessage from "../utils/AlertMessage";

const useStyles = makeStyles((theme) => ({
  animation: {
    transition: '1s',
    opacity: '1',
    padding: '0 20px',
    margin: '12px auto',
  },
  before: {
    opacity: '0',
    padding: '0 20px',
    margin: '0 auto',
  },
  minAnimation: {
    transition: '1s',
    opacity: '1',
    padding: '0 10px',
    margin: '12px auto',
  },
  minBefore: {
    opacity: '0',
    padding: '0 10px',
    margin: '0 auto',
  },
  minTab: {
    fontSize: '10px',
  },
  topContent: {
    display: 'flex',
    margin: '0 auto',
    maxWidth: '250px',
    marginBottom: '20px'
  },
  minTopContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto',
    maxWidth: '100px',
  },
  header: {
    paddingTop: '30px',
    lineHeight: '1',
    textAlign: 'left'
  },
  minHeader: {
    paddingTop: '5px',
    lineHeight: '1',
    textAlign: 'center',
  },
  avatar: {
    margin: 'auto',
    marginTop: '40px',
    width: '80px',
    height: '80px',
    marginRight: '15px'
  },
  minAvatar: {
    margin: '0 auto',
    marginTop: '20px',
    width: '80px',
    height: '80px',
  },
  userInfo: {
    display: 'flex',
    flexFlow: 'column',
    paddingTop: '15px',
  },
  setting: {
    cursor: "pointer",
    color: 'white',
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none",
  },
  minSetting: {
    cursor: "pointer",
    color: 'white',
    margin: '10px auto',
    flexGrow: 1,
    textTransform: "none",
    width: '150px',
  },
  pagination: {
    display: 'inline-block',
  },
  pageWrapper: {
    marginTop: '80px',
  },
  relationships: {
    maxWidth: '50%',
    margin: "0 auto"
  },
  minRelationships: {
    maxWidth: '100%',
    margin: "0 auto"
  },
}));

function TabPanel(props) {
  const {children, value, index, classes, ...other} = props;

  return (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
    >
        {value === index && (
          <Container>
              <Box>
                {children}
              </Box>
          </Container>
        )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ShowUser = () => {
  const { id } = useParams();
  const classes = useStyles();
  const location = useLocation();
  const [user, setUser] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [open, setOpen] = useState(false);
  const [bookmarkPictures, setBookmarkPictures] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(1);
  const [likesPage, setLikesPage] = useState(1);
  const [pageOpen, setPageOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [followings, setFollowings] = useState([]);
  const [followingsPage, setFollowingsPage] = useState(1);
  const [followers, setFollowers] = useState([]);
  const [followersPage, setFollowersPage] = useState(1);
  const [successMessageOpen, setSuccessMessageOpen] = useState(location.state ? (location.state.successMessageOpen) : (false));
  const matches = useMediaQuery('(min-width:575px)');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPageOpen(false);
  };

  const handleShowUser = async () => {
    try {
      const res = await showUser(id);
      if (res.status === 200) {
        const data = res.data;
        setUser(data);
        setAvatar(data.image);
        setPictures(data.pictures);
        setBookmarkPictures(data.bookmarkPictures);
        setFollowings(data.followings);
        setFollowers(data.followers);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
    setTimeout(() => { setIsOpen(true) }, 400);
  }

  const handleOpen = () => {
    setOpen(true);
  };


  const pageAnimation = () => {
    setTimeout(() => { setPageOpen(true) }, 300);
  };


  useEffect(() => {
    handleShowUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    pageAnimation();
  }, [pageOpen]);

  return (
    <>
      {!loading ? (
        <>
          {matches ? (
            <>
              <div className={isOpen ? classes.animation : classes.before}>
                <div className={classes.topContent}>
                  <Avatar
                    alt="avatar"
                    src={avatar.url}
                    className={classes.avatar}
                    />
                  <div className={classes.userInfo}>
                    <Typography className={classes.header} variant="h6">
                      {user.name}
                    </Typography>
                    { currentUser.name !== "ゲストユーザー" ? (
                      <>
                        { currentUser.id !== user.id ? (
                          <Relationships 
                            user={user}
                            userId={user.id} 
                            />
                        ) : (
                          <Button
                            variant="contained"
                            color="primary" 
                            onClick={handleOpen} 
                            className={classes.setting} >
                            プロフィール編集
                          </Button>
                        ) }
                      </>
                    ) : (
                      <></>
                    ) }
                    <EditUserModal open={open} setOpen={setOpen} user={user} setUser={setUser} setAvatar={setAvatar} />
                  </div>
                </div>
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                      <Tab label="作品一覧" {...a11yProps(0)} />
                      <Tab label="お気に入り" {...a11yProps(1)} />
                      <Tab label="フォロー" {...a11yProps(2)} />
                      <Tab label="フォロワー" {...a11yProps(3)} />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>
                    <div className={pageOpen ? classes.animation : classes.before}>
                      { pictures.length > 0 ? (
                        <Grid container spacing={2}>
                          {
                            pictures.map((picture, i) => (
                              Math.floor(i / 6 + 1) === page && <Grid item xs={12} sm={6} md={4} key={picture.id}>
                                <div className={`${styles.grandParent}`}>
                                  <Link to={{
                                      pathname: "/pictures/" + picture.id,
                                      state: {id: picture.id}
                                    }}
                                    id={picture.id}
                                    >
                                    <Picture picture={picture} 
                                      theme={picture.theme} 
                                      image={picture.image}
                                      />
                                  </Link>
                                </div>
                              </Grid>
                            ))
                          }
                        </Grid>
                      ) : (
                        <h2>描いた絵はまだありません</h2>
                      )}
                    </div>
                    <div className={classes.pageWrapper}>
                      {
                        pictures.length > 6 && (
                          <Pagination 
                            count={Math.ceil(pictures.length / 6)}
                            page={page}
                            onChange={(e, page) => {
                              setPage(page);
                              setPageOpen(false);
                            }}
                            color="primary"
                            className={classes.pagination}
                          />
                        )
                      }
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <div className={pageOpen ? classes.animation : classes.before}>
                      { bookmarkPictures.length > 0 ? (
                        <Grid container spacing={2}>
                          { bookmarkPictures.map((picture, i) => (
                            Math.floor(i / 6 + 1) === likesPage && <Grid item xs={12} sm={6} md={4} key={picture.id}>
                              <div className={`${styles.secondParent}`}>
                                <PictureCard
                                  user={picture.user}
                                  picture={picture} 
                                  pictureId={picture.id}
                                  pictures={pictures}
                                  setPictures={setPictures}
                                />
                              </div>
                            </Grid>
                          ))}
                        </Grid>
                        ) : (
                          <>
                            <h2>お気に入りした絵はまだありません</h2>
                          </>
                        )
                        }
                    </div>
                    <div className={classes.pageWrapper}>
                      {
                        bookmarkPictures.length > 6 && (
                          <Pagination 
                            count={Math.ceil(bookmarkPictures.length / 6)}
                            page={likesPage}
                            onChange={(e, likesPage) => {
                              setLikesPage(likesPage);
                              setPageOpen(false);
                            }}
                            color="primary"
                            className={classes.pagination}
                          />
                        )
                      }
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <div className={pageOpen ? classes.animation : classes.before}>
                      { followings.length > 0 ? (
                        followings.map((following, i) => (
                          Math.floor(i / 6 + 1) === followingsPage && 
                          <div className={classes.relationships} key={following.id}>
                            <Following following={following} handleShowUser={handleShowUser} />
                          </div>
                        ))
                      ) : (
                        <h2>フォローしている人はいません</h2>
                      )}
                    </div>
                    <div className={classes.pageWrapper}>
                      {
                        followings.length > 6 && (
                          <Pagination
                            count={Math.ceil(followings.length / 6)}
                            page={followingsPage}
                            onChange={(e, followingsPage) => {
                              setFollowingsPage(followingsPage);
                              setPageOpen(false);
                            }}
                            color="primary"
                            className={classes.pagination}
                          />
                        )}
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                    <div className={pageOpen ? classes.animation : classes.before}>
                      { followers.length > 0 ? (
                        followers.map((follower, i) => (
                          Math.floor(i / 6 + 1) === followersPage && 
                          <div className={classes.relationships} key={follower.id}>
                            <Follower follower={follower} handleShowUser={handleShowUser} />
                          </div>
                        ))
                      ) : (
                        <h2>フォローしている人はいません</h2>
                      )}
                    </div>
                    <div className={classes.pageWrapper}>
                      {
                        followers.length > 6 && (
                          <Pagination
                            count={Math.ceil(followings.length / 6)}
                            page={followersPage}
                            onChange={(e, followersPage) => {
                              setFollowersPage(followersPage);
                              setPageOpen(false);
                            }}
                            color="primary"
                            className={classes.pagination}
                          />
                        )}
                    </div>
                  </TabPanel>
                </Box>
              </div>
              <AlertMessage
                open={successMessageOpen}
                setOpen={setSuccessMessageOpen}
                severity="success"
                message="ログインに成功しました"
              />
            </>
          ) : (
            <>
              <div className={isOpen ? classes.minAnimation : classes.minBefore}>
                <div className={classes.minTopContent}>
                  <Avatar
                    alt="avatar"
                    src={avatar.url}
                    className={classes.minAvatar}
                    />
                  <div>
                    <Typography className={classes.minHeader} variant="h6">
                      {user.name}
                    </Typography>
                    { currentUser.name !== "ゲストユーザー" ? (
                      <>
                        { currentUser.id !== user.id ? (
                          <Relationships 
                            user={user}
                            userId={user.id} 
                            />
                        ) : (
                          <Button
                            variant="contained"
                            color="primary" 
                            onClick={handleOpen} 
                            className={classes.minSetting} >
                            プロフィール編集
                          </Button>
                        ) }
                      </>
                    ) : (
                      <></>
                    ) }
                    <EditUserModal open={open} setOpen={setOpen} user={user} setUser={setUser} setAvatar={setAvatar} />
                  </div>
                </div>
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth" centered>
                      <Tab className={classes.minTab} label="作品一覧" {...a11yProps(0)} />
                      <Tab className={classes.minTab} label="お気に入り" {...a11yProps(1)} />
                      <Tab className={classes.minTab} label="フォロー" {...a11yProps(2)} />
                      <Tab className={classes.minTab} label="フォロワー" {...a11yProps(3)} />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>
                    <div className={pageOpen ? classes.animation : classes.before}>
                      { pictures.length > 0 ? (
                        <Grid container spacing={2}>
                          {
                            pictures.map((picture, i) => (
                              Math.floor(i / 6 + 1) === page && <Grid item xs={12} sm={6} md={4} key={picture.id}>
                                <div className={`${styles.grandParent}`}>
                                  <Link to={{
                                      pathname: "/pictures/" + picture.id,
                                      state: {id: picture.id}
                                    }}
                                    id={picture.id}
                                    >
                                    <Picture picture={picture} 
                                      theme={picture.theme} 
                                      image={picture.image}
                                      />
                                  </Link>
                                </div>
                              </Grid>
                            ))
                          }
                        </Grid>
                      ) : (
                        <h4>描いた絵はまだありません</h4>
                      )}
                    </div>
                    <div className={classes.pageWrapper}>
                      {
                        pictures.length > 6 && (
                          <Pagination 
                            count={Math.ceil(pictures.length / 6)}
                            page={page}
                            onChange={(e, page) => {
                              setPage(page);
                              setPageOpen(false);
                            }}
                            color="primary"
                            className={classes.pagination}
                          />
                        )
                      }
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <div className={pageOpen ? classes.animation : classes.before}>
                      { bookmarkPictures.length > 0 ? (
                        <Grid container spacing={2}>
                          { bookmarkPictures.map((picture, i) => (
                            Math.floor(i / 6 + 1) === likesPage && <Grid item xs={12} sm={6} md={4} key={picture.id}>
                              <div className={`${styles.secondParent}`}>
                                <PictureCard
                                  user={picture.user}
                                  picture={picture} 
                                  pictureId={picture.id}
                                  pictures={pictures}
                                  setPictures={setPictures}
                                />
                              </div>
                            </Grid>
                          ))}
                        </Grid>
                        ) : (
                          <>
                            <h4>お気に入りはまだありません</h4>
                          </>
                        )
                        }
                    </div>
                    <div className={classes.pageWrapper}>
                      {
                        bookmarkPictures.length > 6 && (
                          <Pagination 
                            count={Math.ceil(bookmarkPictures.length / 6)}
                            page={likesPage}
                            onChange={(e, likesPage) => {
                              setLikesPage(likesPage);
                              setPageOpen(false);
                            }}
                            color="primary"
                            className={classes.pagination}
                          />
                        )
                      }
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <div className={pageOpen ? classes.minAnimation : classes.minBefore}>
                      { followings.length > 0 ? (
                        followings.map((following, i) => (
                          Math.floor(i / 6 + 1) === followingsPage && 
                          <div className={classes.minRelationships} key={following.id}>
                            <Following following={following} handleShowUser={handleShowUser} />
                          </div>
                        ))
                      ) : (
                        <h4>フォローしている人はいません</h4>
                      )}
                    </div>
                    <div className={classes.pageWrapper}>
                      {
                        followings.length > 6 && (
                          <Pagination
                            count={Math.ceil(followings.length / 6)}
                            page={followingsPage}
                            onChange={(e, followingsPage) => {
                              setFollowingsPage(followingsPage);
                              setPageOpen(false);
                            }}
                            color="primary"
                            className={classes.pagination}
                          />
                        )}
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                    <div className={pageOpen ? classes.minAnimation : classes.minBefore}>
                      { followers.length > 0 ? (
                        followers.map((follower, i) => (
                          Math.floor(i / 6 + 1) === followersPage && 
                          <div className={classes.minRelationships} key={follower.id}>
                            <Follower follower={follower} handleShowUser={handleShowUser} />
                          </div>
                        ))
                      ) : (
                        <h4>まだフォロワーはいません</h4>
                      )}
                    </div>
                    <div className={classes.pageWrapper}>
                      {
                        followers.length > 6 && (
                          <Pagination
                            count={Math.ceil(followings.length / 6)}
                            page={followersPage}
                            onChange={(e, followersPage) => {
                              setFollowersPage(followersPage);
                              setPageOpen(false);
                            }}
                            color="primary"
                            className={classes.pagination}
                          />
                        )}
                    </div>
                  </TabPanel>
                </Box>
              </div>
              <AlertMessage
                open={successMessageOpen}
                setOpen={setSuccessMessageOpen}
                severity="success"
                message="ログインに成功しました"
              />
            </>
          )}
        </>
      ) : (
        <Loader />
      ) }
    </>
  )
};

export default ShowUser;
