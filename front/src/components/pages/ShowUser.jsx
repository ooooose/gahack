import React, { useState, useEffect } from "react";
import { showUser } from "../../lib/api/users";

import {Grid, 
        makeStyles, 
        Typography, 
        Avatar, 
        Tab, 
        Tabs, 
        Box, 
        Container } from "@material-ui/core";

import PropTypes from 'prop-types';
import Picture from "../atoms/picture/Picture";
import { useParams, Link } from "react-router-dom";
import styles from "../../css/components/Frames.module.css"
import { useContext } from "react";
import { AuthContext } from "../../App";
import SettingsIcon from '@material-ui/icons/Settings';
import EditUserModal from "../molecules/EditUserModal";
import { Pagination } from "@material-ui/lab";


const useStyles = makeStyles((theme) => ({
  animation: {
    transition: '1s',
    opacity: '1',
    padding: '0 60px',
    margin: '12px auto',
  },
  before: {
    opacity: '0',
    padding: '0 60px',
    margin: '0 auto',
  },
  header: {
    paddingTop: '30px',
    paddingBottom: '20px'
  },
  avatar: {
    marginTop: '40px',
    width: '80px',
    height: '80px',
    textAlign: 'center',
    margin: '0 auto',
  },
  setting: {
    cursor: "pointer",
  },
  pagination: {
    display: 'inline-block',
  },
  pageWrapper: {
    marginTop: '80px',
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
  const [user, setUser] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [open, setOpen] = useState(false);
  const [likedPictures, setLikedPictures] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(1);
  const [likesPage, setLikesPage] = useState(1);
  const [pageOpen, setPageOpen] = useState(false);

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
        setLikedPictures(data.likedPictures);
      }
    } catch (e) {
      console.log(e);
    }
  }
  
  const handleOpen = () => {
    setOpen(true);
  };

  const pageAnimation = () => {
    setTimeout(() => { setPageOpen(true) }, 300);
  };

  setTimeout(() => { setIsOpen(true) }, 400);

  useEffect(() => {
    handleShowUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    pageAnimation();
  }, [pageOpen]);
  
  return (
    <>
      <div className={isOpen ? classes.animation : classes.before}>
        <Avatar
          alt="avatar"
          src={avatar.url}
          className={classes.avatar}
          />
        <Typography className={classes.header} variant="h5">
          {user.name}さんのプロフィール
          { currentUser ? (
              <SettingsIcon onClick={handleOpen} className={classes.setting} />
            ) : (
              <></>
            )
          }
        </Typography>
        <EditUserModal open={open} setOpen={setOpen} setUser={setUser} setAvatar={setAvatar} />
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '50%' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
              <Tab label="作品一覧" {...a11yProps(0)} />
              <Tab label="いいね一覧" {...a11yProps(1)} />
              {/* <Tab label="フォロー" {...a11yProps(2)} />
              <Tab label="フォロワー" {...a11yProps(3)} /> */}
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div className={pageOpen ? classes.animation : classes.before}>
              <Grid container spacing={2}>
                {
                  pictures.map((picture, i) => (
                    Math.floor(i / 6 + 1) === page && <Grid item xs={12} sm={6} md={4} key={picture.id}>
                      <div className={`${styles.parent}`}>
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
              <Grid container spacing={2}>
                { likedPictures.length > 0 ? (
                  likedPictures.map((picture, i) => (
                    Math.floor(i / 6 + 1) === likesPage && <Grid item xs={12} sm={6} md={4} key={picture.id}>
                      <div className={`${styles.parent}`}>
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
                ) : (
                  <>
                    <h3>いいねした絵はまだありません！</h3>
                  </>
                )
                }
              </Grid>
            </div>
            <div className={classes.pageWrapper}>
              {
                likedPictures.length > 6 && (
                  <Pagination 
                    count={Math.ceil(likedPictures.length / 6)}
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
          {/* <TabPanel value={value} index={2}>
            未実装です。
          </TabPanel>
          <TabPanel value={value} index={3}>
            未実装です。
          </TabPanel> */}
        </Box>
      </div>
    </>
  )
};

export default ShowUser;