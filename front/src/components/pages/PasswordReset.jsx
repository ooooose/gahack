import React, { useState, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';
import { Form } from '../atoms/forms/Form';
import AlertMessage from '../utils/AlertMessage';
import { passwordReset } from '../../lib/api/auth';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(12),
    marginBottom: '240px',
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: 'none',
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: '400px',
  },
  minCard: {
    padding: theme.spacing(2),
    maxWidth: '300px',
  },
  header: {
    textAlign: 'center',
  },
  box: {
    marginTop: '2rem',
  },
}));

function PasswordReset() {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:575px)');
  const [email, setEmail] = useState('');
  const [alertMessageOpen, setAlertMessageOpen] = useState(false);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);

  const generateParams = useCallback(() => {
    const passwordResetParams = {
      email,
      redirectUrl: 'https://gahack.net/password/reset',
    };
    return passwordResetParams;
  }, [email]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const data = generateParams();
      try {
        const res = await passwordReset(data);
        if (res.status === 200) {
          setEmail('');
          setSuccessMessageOpen(true);
        }
      } catch (e) {
        console.log(e);
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
            <CardHeader className={classes.header} title="パスワードリセット" />
            <CardContent>
              <Form
                label="メールアドレス"
                onChange={(event) => setEmail(event.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                color="primary"
                disabled={!email}
                className={classes.submitBtn}
                onClick={handleSubmit}
              >
                メールを送信する
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className={classes.minCard}>
            <CardHeader className={classes.header} title="パスワードリセット" />
            <CardContent>
              <Form
                label="メールアドレス"
                onChange={(event) => setEmail(event.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                color="primary"
                disabled={!email}
                className={classes.submitBtn}
                onClick={handleSubmit}
              >
                メールを送信する
              </Button>
            </CardContent>
          </Card>
        )}
      </form>
      <AlertMessage
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="メールの送信に失敗しました"
      />
      <AlertMessage
        open={successMessageOpen}
        setOpen={setSuccessMessageOpen}
        severity="success"
        message="メールの送信に成功しました"
      />
    </div>
  );
}

export default PasswordReset;
