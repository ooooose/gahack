import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core';
import { guestSignIn } from '../../../lib/api/auth';
import Cookies from 'js-cookie';
import { AuthContext } from '../../../App';

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: '14px',
    padding: '5px 16px'
  },
}));


const GuestLoginButton = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await guestSignIn();
      if (res.status === 200) {
        console.log(res);
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);
        setIsSignedIn(true);
        setCurrentUser(res.data.data);
        navigate("/", {state: { successMessageOpen: true }});
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
    <Button
        type="submit"
        className={classes.button}
        variant="contained"
        size="large"
        color="default"
        onClick={handleSignInSubmit}
      >
        ゲストログイン
      </Button>
    </>
  )
}

export default GuestLoginButton;