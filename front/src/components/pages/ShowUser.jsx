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
  }
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
  setTimeout(() => { setIsOpen(true) }, 500);

  useEffect(() => {
    handleShowUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
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
            <Grid container spacing={2}>
              {
                pictures.map((picture) => (
                  <Grid item xs={12} sm={6} md={4} key={picture.id}>
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
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container spacing={2}>
              { likedPictures.length > 0 ? (
                likedPictures.map((picture) => (
                  <Grid item xs={12} sm={6} md={4} key={picture.id}>
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