import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
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
    marginTop: theme.spacing(6)
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
  },
  imageUploadBtn: {
    textAlign: "right"
  },
  input: {
    display: "none"
  },
  preview: {
    width: "100%"
  }
}));

const SignUp = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [alertMessageOpen, setAlertMessageOpen] = useState(false);

  const generateParams = () => {
    const signUpParams = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
    };
    return signUpParams;
  };

  const handleSignUpSubmit = async (e) => {
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
  };
  return (
    <>
     <div className={classes.container}>
        <form noValidate autoComplete="off" style={{display:"inline-block"}}>
          <Card className={classes.card}>
            <CardHeader className={classes.header} title="サインアップ画面" />
            <CardContent>
              <Form
                label={"Name"}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <Form
                label={"Email"}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Form
                label={"Password"}
                type={"password"}
                value={password}
                autoComplete={"current-password"}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Form
                label={"Password Confirmation"}
                type={"password"}
                value={passwordConfirmation}
                autoComplete={"current-password"}
                onChange={(event) => setPasswordConfirmation(event.target.value)}
              />
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

export default SignUp;
