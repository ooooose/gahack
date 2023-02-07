import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Box from "@material-ui/core/Box";

import { signIn } from "../../lib/api/auth";
import { AuthContext } from "../../App";
import AlertMessage from "../utils/AlertMessage";
import { LoginButton } from "../atoms/buttons/LoginButton";
import { Form } from "../atoms/forms/Form";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(6),
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
  box: {
    marginTop: "2rem"
  },
  link: {
    textDecoration: "none"
  }
}));

export const SignIn = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessageOpen, setAlertMessageOpen] = useState(false);

  const generateParams = () => {
    const signInParams = {
      email: email,
      password: password,
    };
    return signInParams;
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const params = generateParams();

    try {
      const res = await signIn(params);
      if (res.status === 200) {
        console.log(res);
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        navigate("/themes");
        console.log("Signed in successfully!");
      }
    } catch (e) {
      console.log(e);
      setAlertMessageOpen(true);
    }
  };
  return (
    <>
      <div className={classes.container}>
        <form noValidate autoComplete="off" style={{display:"inline-block"}}>
          <Card className={classes.card}>
            <CardHeader className={classes.header} title="ログイン画面" />
            <CardContent>
              <Form
                label={"Email"}
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
              <Form
                label={"password"}
                type={"password"}
                value={password}
                autoComplete={"current-password"}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Box style={{textAlign: 'right'}}>
                <Typography variant="body2" >
                  パスワードをお忘れの方は
                  <Link to="/password" className={classes.link} >
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
        </form>
        <AlertMessage
          open={alertMessageOpen}
          setOpen={setAlertMessageOpen}
          severity="error"
          message="Emailもしくはパスワードが無効です"
        />
      </div>
    </>
  );
};

export default SignIn;
