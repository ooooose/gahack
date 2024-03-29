import React, { useContext } from 'react';
import { Modal, Button, makeStyles, useMediaQuery } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AuthContext from '../../context';
import { signOut } from '../../lib/api/auth';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: 24,
    padding: '15px',
    borderRadius: '6px',
    textAlign: 'center',
  },
  minPaper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: 24,
    padding: '15px',
    borderRadius: '6px',
    textAlign: 'center',
  },
  buttons: {
    paddingTop: '5px',
  },
  buttonLink: {
    textDecoration: 'none',
    color: 'white',
  },
  cancelButton: {
    marginRight: '5px',
  },
}));

function GuestsAlert({ open, setOpen }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width:575px)');
  const { setIsSignedIn } = useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      const res = await signOut();

      if (res.data.success === true) {
        Cookies.remove('_access_token');
        Cookies.remove('_client');
        Cookies.remove('_uid');

        setIsSignedIn(false);
        navigate('/signup');
      } else {
        console.log('Failed in sign out');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <>
      {matches ? (
        <div className={classes.paper}>
          <h2 id="simple-modal-title">ユーザー登録をお願いします</h2>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              onClick={() => setOpen(false)}
              className={classes.cancelButton}
            >
              閉じる
            </Button>
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              onClick={handleSignOut}
            >
              ユーザー登録へ
            </Button>
          </div>
        </div>
      ) : (
        <div className={classes.minPaper}>
          <h3 id="simple-modal-title">ユーザー登録をお願いします</h3>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              onClick={() => setOpen(false)}
              className={classes.cancelButton}
            >
              閉じる
            </Button>
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              onClick={handleSignOut}
            >
              ユーザー登録へ
            </Button>
          </div>
        </div>
      )}
    </>
  );
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}

export default GuestsAlert;
