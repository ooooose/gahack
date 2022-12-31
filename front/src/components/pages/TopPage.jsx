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
            <h1>こんにちは、{currentUser?.name}さん！</h1>
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