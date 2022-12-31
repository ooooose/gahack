import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "../App";

const PrivateRoute = (props) => {
  const { isSignedIn } = useContext(AuthContext);
  return isSignedIn ? <Route {...props} /> : <Navigate to="/" />;
};

export default PrivateRoute;