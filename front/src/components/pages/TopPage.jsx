import React, { useContext } from 'react';

import { AuthContext } from "../../App";
import TopMain from '../organisms/TopMain';
import TopDescription from '../organisms/TopDescription';
import TopBottom from '../organisms/TopBottom';


const TopPage = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext);

  return (
    <>    
      {
        isSignedIn && currentUser ? (
          <>
            <h1>Signed in successfully!!!</h1>
            <h2>Email: {currentUser?.email}</h2>
            <h2>Name: {currentUser?.name}</h2>
          </>
        ) : (
          <>
            <TopMain />
            <TopDescription />
            <TopBottom />
          </>
        )
      }
    </>
  )
};

export default TopPage;