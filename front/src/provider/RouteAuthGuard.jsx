import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../App';

function RouteAuthGuard(props) {
  const { loading, isSignedIn } = useContext(AuthContext);

  if (!loading) {
    if (!isSignedIn) {
      return <Navigate to={props.redirect} replace={false} />;
    }
    return <>{props.component}</>;
  }
}

export default RouteAuthGuard;
