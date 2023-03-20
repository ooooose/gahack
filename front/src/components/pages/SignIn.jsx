import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Typography, useMediaQuery, Card, CardContent, CardHeader, Box, makeStyles } from '@material-ui/core';

import { signIn } from '../../lib/api/auth';
import AuthContext from '../../context';
import AlertMessage from '../utils/AlertMessage';
import LoginButton from '../atoms/buttons/LoginButton';
import Form from '../atoms/forms/Form';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(10),
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: 'none',
  },
  header: {
    textAlign: 'center',
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 400,
  },
  minCard: {
    padding: theme.spacing(2),
    maxWidth: 300,
  },
  box: {
    marginTop: '2rem',
  },
  link: {
    textDecoration: 'none',
  },
}));

function SignIn() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const matches = useMediaQuery('(min-width:575px)');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessageOpen, setAlertMessageOpen] = useState(false);
  const [successMessageOpen, setSuccessMessageOpen] = useState(
    location.state ? location.state.successMessageOpen : false,
  );

  const generateParams = () => {
    const signInParams = {
      email,
      password,
    };
    return signInParams;
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const handleSignInSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const params = generateParams();

      try {
        const res = await signIn(params);
        if (res.status === 200) {
          Cookies.set('_access_token', res.headers['access-token']);
          Cookies.set('_client', res.headers.client);
          Cookies.set('_uid', res.headers.uid);

          setIsSignedIn(true);
          setCurrentUser(res.data.data);

          navigate(`/users/${res.data.data.id}`, {
            state: { successMessageOpen: true },
          });
        }
      } catch (err) {
        console.log(err);
        setAlertMessageOpen(true);
      }
    },
    [generateParams],
  );

  return (
    <div className={classes.container}>
      <form noValidate autoComplete="off" style={{ display: 'inline-block' }}>
        {matches ? (
          <Card className={classes.card}>
            <CardHeader className={classes.header} title="ログイン画面" />
            <CardContent>
              <Form
                label="メールアドレス"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Form
                label="パスワード"
                type="password"
                value={password}
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <Box style={{ textAlign: 'right' }}>
                <Typography variant="body2">
                  パスワードをお忘れの方は
                  <Link to="/password" className={classes.link}>
                    こちら
                  </Link>
                </Typography>
              </Box>
              <LoginButton
                email={email}
                password={password}
                handleSubmit={handleSignInSubmit}
              >
                ログインする
              </LoginButton>
              <Box textAlign="center" className={classes.box}>
                <Typography variant="body2">
                  アカウントをお持ちですか? &nbsp;
                  <Link to="/signup" className={classes.link}>
                    ユーザー登録はこちら!
                  </Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ) : (
          <Card className={classes.minCard}>
            <CardHeader className={classes.header} title="ログイン画面" />
            <CardContent>
              <Form
                label="メールアドレス"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Form
                label="パスワード"
                type="password"
                value={password}
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <Box style={{ textAlign: 'right' }}>
                <Typography variant="body2">
                  パスワードをお忘れの方は
                  <Link to="/password" className={classes.link}>
                    こちら
                  </Link>
                </Typography>
              </Box>
              <LoginButton
                email={email}
                password={password}
                handleSubmit={handleSignInSubmit}
              >
                ログインする
              </LoginButton>
              <Box textAlign="center" className={classes.box}>
                <Typography variant="body2">
                  アカウントをお持ちですか? &nbsp;
                  <Link to="/signup" className={classes.link}>
                    <br />
                    ユーザー登録はこちら!
                  </Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )}
      </form>
      <AlertMessage
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Emailもしくはパスワードが無効です"
      />
      <AlertMessage
        open={successMessageOpen}
        setOpen={setSuccessMessageOpen}
        severity="success"
        message="ユーザー登録に成功しました。"
      />
    </div>
  );
}

export default SignIn;
