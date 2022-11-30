import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getCurrentUser } from "./lib/api/auth";

import CommonLayout from "./components/layouts/CommonLayout";
import Home from "./components/pages/Home";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Canvas from "./components/pages/Canvas";
import ThemeIndex from "./components/pages/ThemeIndex";

export const AuthContext = createContext();

function App() {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
        console.log(res?.data.data);
      } else {
        console.log("no current user");
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  // const Private = ({ children }) => {
  //   const navigate = useNavigate();
  //   if (!loading) {
  //     if (isSignedIn) {
  //       return children;
  //     } else {
  //       return navigate("/signin");
  //     }
  //   } else {
  //     return <></>;
  //   }
  // };


  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser,
      }}
    >
      <Router>
        <CommonLayout>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<Home />} />
            <Route path="/picture" element={<Canvas />} />
            <Route path="/themes" element={<ThemeIndex />} />
          </Routes>
        </CommonLayout>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
