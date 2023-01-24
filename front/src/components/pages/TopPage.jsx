import React, { useState, useContext } from 'react';

import { AuthContext } from "../../App";
import TopMain from '../organisms/TopMain';
import TopDescription from '../organisms/TopDescription';
import TopBottom from '../organisms/TopBottom';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  animation: {
    transition: '1s',
    opacity: '1',
  },
  before: {
    opacity: '0',
  },
}));

const TopPage = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, currentUser } = useContext(AuthContext);

  setTimeout(() => { setIsOpen(true) }, 200);

  return (
    <>
      <div className={isOpen ? classes.animation : classes.before}>
        {
          isSignedIn && currentUser ? (
            <>
              <h1>こんにちは！！</h1>
            </>
          ) : (
            <>
              <TopMain />
              <TopDescription />
              <TopBottom />
            </>
          )
        }
      </div>
    </>
  )
};

export default TopPage;