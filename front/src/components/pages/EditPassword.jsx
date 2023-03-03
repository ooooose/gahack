import React, { useState } from "react";

import { makeStyles, Card, CardHeader, CardContent, Button, useMediaQuery } from "@material-ui/core";
import { Form } from "../atoms/forms/Form";
import { useSearchParams, useNavigate } from "react-router-dom";
import { editPassword } from "../../lib/api/auth";
import AlertMessage from "../utils/AlertMessage";

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
    maxWidth: '400px'
  },
  minCard: {
    padding: theme.spacing(2),
    maxWidth: '300px'
  },
  header: {
    textAlign: 'center'
  },
  box: {
    marginTop: '2rem',
  },
}));


const EditPassword = () => {
  const classes = useStyles();
  const [searchParams] = useSearchParams();
  const navigation = useNavigate();
  const matches = useMediaQuery('(min-width:575px)');
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [alertMessageOpen, setAlertMessageOpen] = useState(false);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);

  const generateParams = () => {
    const data = {
      password: password,
      passwordConfirmation: passwordConfirmation,
      resetPasswordToken: searchParams.get('reset_password_token'),
    }
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = generateParams();
    const query = searchParams;

    try {
      const res = await editPassword(data, query);
      console.log(data.resetPasswordToken);
      if (res.status === 200) {
        navigation("/signin");
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
        <form noValidate autoComplete="off" style={{display: "inline-block"}}>
          {matches ? (
            <>
              <Card className={classes.card}>
                <CardHeader className={classes.header} title="パスワード変更" />
                <CardContent>
                  <Form 
                    label={"パスワード"}
                    type={"password"}
                    placeholder={"６文字以上で設定してください"}
                    value={password}
                    onChange={e => {setPassword(e.target.value)}}
                  />
                  <Form 
                    label={"パスワード（確認）"}
                    type={"password"}
                    value={passwordConfirmation}
                    onChange={e => {setPasswordConfirmation(e.target.value)}}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    color="primary"
                    disabled={ !password || !passwordConfirmation ? true : false}
                    className={classes.submitBtn}
                    onClick={handleSubmit}
                  >
                    パスワードを変更する
                  </Button>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card className={classes.minCard}>
                <CardHeader className={classes.header} title="パスワード変更" />
                <CardContent>
                  <Form 
                    label={"パスワード"}
                    type={"password"}
                    placeholder={"６文字以上で設定してください"}
                    value={password}
                    onChange={e => {setPassword(e.target.value)}}
                  />
                  <Form 
                    label={"パスワード（確認）"}
                    type={"password"}
                    value={passwordConfirmation}
                    onChange={e => {setPasswordConfirmation(e.target.value)}}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    color="primary"
                    disabled={ !password || !passwordConfirmation ? true : false}
                    className={classes.submitBtn}
                    onClick={handleSubmit}
                  >
                    パスワードを変更する
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </form>
        <AlertMessage 
          open={alertMessageOpen}
          setOpen={setAlertMessageOpen}
          severity="error"
          message="パスワードの変更に失敗しました"
        />
        <AlertMessage 
          open={successMessageOpen}
          setOpen={setSuccessMessageOpen}
          severity="success"
          message="パスワードを変更しました"
        />
      </div>
    </>
  )
};

export default EditPassword;