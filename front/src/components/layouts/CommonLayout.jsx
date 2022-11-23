import React from "react";

import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Header from "./Header";


const useStyles = makeStyles(() => ({
  container: {
    marginTop: '3rem',
    textAlign: "center"
  }
}))

const CommonLayout = (props) => {
  const classes = useStyles();

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth='lg' className={classes.container}>
          <Grid sytle={{justify:"center"}}>
            <Grid item>
              {props.children}
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  )
};

export default CommonLayout;
