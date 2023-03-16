import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, useMediaQuery } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Box from "@material-ui/core/Box";

import { signUp } from "../../lib/api/auth";
import AlertMessage from "../utils/AlertMessage";
import { SignUpButton } from "../atoms/buttons/SignUpButton";
import { Form } from "../atoms/forms/Form";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none"
  },
  header: {
    textAlign: "center"
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 400
  },
  minCard: {
    padding: theme.spacing(2),
    maxWidth: 300
  },
  box: {
    marginTop: "15px"
  },
  link: {
    textDecoration: "none"
  },
  imageUploadBtn: {
    textAlign: "right"
  },
  input: {
    display: "none"
  },
  preview: {
    width: "100%"
  },
  caution: {
    fontSize: '13px',
    marginTop: '10px',
  },
  minCaution: {
    fontSize: '10px',
    marginTop: '5px',
  },
}));

function SignUp() {
  const classes = useStyles();
  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width:575px)');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [alertMessageOpen, setAlertMessageOpen] = useState(false);

  const generateParams = useCallback(() => {
    const signUpParams = {
      name,
      email,
      password,
      passwordConfirmation,
    };
    return signUpParams;
  }, [name, email, password, passwordConfirmation]);

  const handleSignUpSubmit = useCallback(async (e) => {
    e.preventDefault();
    const params = generateParams();

    try {
      const res = await signUp(params);
      console.log(res);

      navigate('/signin',
      {state: {successMessageOpen: true}});
    } catch (e) {
      console.log(e);
      setAlertMessageOpen(true);
    }
  }, [generateParams, navigate]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  
  return (
    <div className={classes.container}>
        <form noValidate autoComplete="off" style={{display:"inline-block"}}>
          {matches ? (
            <Card className={classes.card}>
                <CardHeader className={classes.header} title="サインアップ画面" />
                <CardContent>
                  <Form
                    label="お名前"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <Form
                    label="メールアドレス"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <Form
                    label="パスワード"
                    type="password"
                    placeholder="６文字以上で設定してください"
                    value={password}
                    autoComplete="current-password"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <Form
                    label="パスワード（確認用）"
                    type="password"
                    value={passwordConfirmation}
                    autoComplete="current-password"
                    onChange={(event) => setPasswordConfirmation(event.target.value)}
                  />
                  <Box style={{textAlign: 'right'}}>
                    <Typography variant="body2" className={classes.caution}>
                      本サービスへの登録申込をもって
                      <Link to="/termsofservice" className={classes.link} >
                        利用規約
                      </Link>
                      、<br />及び
                      <Link to="/privacypolicy" className={classes.link} >
                        プライバシーポリシー
                      </Link>
                      に同意したものとみなします。
                    </Typography>
                  </Box>
                  <SignUpButton
                    name={name}
                    email={email}
                    password={password}
                    passwordConfirmation={passwordConfirmation}
                    handleSubmit={handleSignUpSubmit}
                  >
                    登録する
                  </SignUpButton>
                  <Box textAlign="center" className={classes.box}>
                    <Typography>
                      既にアカウントをお持ちの方は &nbsp;
                      <Link to="/signin" className={classes.link}>
                        こちら
                      </Link>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
          ) : (
            <Card className={classes.minCard}>
                <CardHeader className={classes.header} title="サインアップ画面" />
                <CardContent>
                  <Form
                    label="お名前"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <Form
                    label="メールアドレス"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <Form
                    label="パスワード"
                    type="password"
                    placeholder="６文字以上で設定してください"
                    value={password}
                    autoComplete="current-password"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <Form
                    label="パスワード（確認用）"
                    type="password"
                    value={passwordConfirmation}
                    autoComplete="current-password"
                    onChange={(event) => setPasswordConfirmation(event.target.value)}
                  />
                  <Box style={{textAlign: 'right'}}>
                    <Typography variant="body2" className={classes.minCaution}>
                      本サービスへの登録申込をもって
                      <Link to="/termsofservice" className={classes.link} >
                        利用規約
                      </Link>
                      、<br />及び
                      <Link to="/privacypolicy" className={classes.link} >
                        プライバシーポリシー
                      </Link>
                      に同意したものとみなします。
                    </Typography>
                  </Box>
                  <SignUpButton
                    name={name}
                    email={email}
                    password={password}
                    passwordConfirmation={passwordConfirmation}
                    handleSubmit={handleSignUpSubmit}
                  >
                    登録する
                  </SignUpButton>
                  <Box textAlign="center" className={classes.box}>
                    <Typography>
                      既にアカウントをお持ちの方は &nbsp;
                      <Link to="/signin" className={classes.link}><br />
                        こちら
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
      </div>
  );
}

export default SignUp;
