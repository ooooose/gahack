// import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Box from "@material-ui/core/Box";
import PhotoCamera from "@material-ui/icons/PhotoCamera"
import CancelIcon from '@material-ui/icons/Cancel';

import { signUp } from "../../lib/api/auth";
// import { AuthContext } from "../../App";
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

  // const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [alertMessageOpen, setAlertMessageOpen] = useState(false);
  const confirmSuccessUrl = "http://localhost:8000/signin";

  const generateParams = () => {
    const signUpParams = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
      image: image,
      confirmSuccessUrl: confirmSuccessUrl,
    };
    return signUpParams;
  };

  console.log(image);

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const params = generateParams();

    console.log(params);
    try {
      const res = await signUp(params);
      console.log(res);
      window.alert("メールを送信しましたので、ご確認ください。");
    } catch (e) {
      console.log(e);
      setAlertMessageOpen(true);
    }
  };
  console.log(image);

  const uploadImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }

  const previewImage = (e) => {
    const file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
  }


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
              <div className={classes.imageUploadBtn}>
                <input 
                  accept="image/*"
                  className={classes.input}
                  id="icon-button-file"
                  type="file"
                  onChange={(e) => {
                    uploadImage(e)
                    previewImage(e)
                  }}
                />
                <label htmlFor="icon-button-file">
                  <IconButton 
                    color='primary'
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </div>
              {
                preview ? (
                  <>
                    <Box
                      className={classes.box}
                    >
                      <IconButton
                        color="inherit"
                        onClick={() => setPreview("")}>
                        <CancelIcon />
                      </IconButton>
                      <img
                        src={preview}
                        alt="preview img"
                        className={classes.preview}
                      />
                    </Box>
                  </>
                ) : (
                  <></>
                )
              }
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
