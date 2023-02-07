import React, { useState } from "react";
import { Card, CardContent, CardHeader, Button, makeStyles } from "@material-ui/core";
import { Form } from "../atoms/forms/Form";
import AlertMessage from "../utils/AlertMessage";
import { passwordReset } from "../../lib/api/auth";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(6),
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: 'none',
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: '400px'
  },
  header: {
    textAlign: 'center'
  },
  box: {
    marginTop: '2rem',
  },
}));

const PasswordReset = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [alertMessageOpen, setAlertMessageOpen] = useState(false);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);

  const generateParams = () => {
    const passwordResetParams = {
      email: email,
      redirectUrl: "http://localhost:8000/password/reset"
    }
    return passwordResetParams;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = generateParams();
    try {
      const res = await passwordReset(data);
      if (res.status === 200) {
        setEmail("");
        setSuccessMessageOpen(true);
      }
    } catch (e) {
      console.log(e);
      setAlertMessageOpen(true);
    }
  }

  return (
    <>
      <div className={classes.container}>
        <form noValidate autoComplete="off" style={{display: 'inline-block'}}>
          <Card className={classes.card}>
            <CardHeader className={classes.header} title="パスワードリセット" />
            <CardContent>
              <Form 
                label={"メールアドレス"}
                onChange={event => setEmail(event.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                color="primary"
                disabled={!email ? true : false}
                className={classes.submitBtn}
                onClick={handleSubmit}
              >
                メールを送信する
              </Button>
            </CardContent>
          </Card>
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
    </>
  )
}

export default PasswordReset;