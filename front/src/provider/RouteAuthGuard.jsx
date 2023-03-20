import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context';

function RouteAuthGuard({redirect, component}) {
  const { loading, isSignedIn } = useContext(AuthContext);

  if (!loading) {
    if (!isSignedIn) {
      return <Navigate to={redirect} replace={false} />;
    }
    return <>{component}</>;
  }
}

export default RouteAuthGuard;
