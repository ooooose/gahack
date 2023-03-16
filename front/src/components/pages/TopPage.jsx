import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { AuthContext } from '../../App';
import TopMain from '../organisms/TopMain';
import TopDescription from '../organisms/TopDescription';
import TopBottom from '../organisms/TopBottom';
import Timeline from './Timeline';
import AlertMessage from '../utils/AlertMessage';

const useStyles = makeStyles((theme) => ({
  animation: {
    transition: '1s',
    opacity: '1',
  },
  before: {
    opacity: '0',
  },
}));

function TopPage() {
  const classes = useStyles();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [successMessageOpen, setSuccessMessageOpen] = useState(
    location.state ? location.state.successMessageOpen : false,
  );
  const { isSignedIn, currentUser } = useContext(AuthContext);

  setTimeout(() => {
    setIsOpen(true);
  }, 200);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      <div className={isOpen ? classes.animation : classes.before}>
        {isSignedIn && currentUser ? (
          <Timeline />
        ) : (
          <>
            <TopMain />
            <TopDescription />
            <TopBottom />
          </>
        )}
      </div>
      <AlertMessage
        open={successMessageOpen}
        setOpen={setSuccessMessageOpen}
        severity="success"
        message="ログアウトに成功しました"
      />
    </>
  );
}

export default TopPage;
