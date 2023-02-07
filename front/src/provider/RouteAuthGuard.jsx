import React, { useContext } from "react";
import { AuthContext } from "../App";
import { Navigate } from "react-router-dom";


const RouteAuthGuard = (props) => {
  const { loading, isSignedIn } = useContext(AuthContext);

  if (!loading) {
    if (!isSignedIn) {
      return <Navigate to={props.redirect} replace={false} />
    }
    return <>{props.component}</>
  }
}

export default RouteAuthGuard; 