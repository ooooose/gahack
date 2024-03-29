import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getCurrentUser } from './lib/api/auth';
import AuthContext from './context';

import CommonLayout from './components/layouts/CommonLayout';
import TopPage from './components/pages/TopPage';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import Canvas from './components/pages/Canvas';
import ThemeIndex from './components/pages/ThemeIndex';
import Theme from './components/pages/Theme';
import ShowPicture from './components/pages/ShowPicture';
import ShowUser from './components/pages/ShowUser';
import './css/fonts/style.css';
import NotFound from './components/pages/NotFound';
import RouteAuthGuard from './provider/RouteAuthGuard';
import PasswordReset from './components/pages/PasswordReset';
import EditPassword from './components/pages/EditPassword';
import TwitterAnswer from './components/pages/TwitterAnswer';
import Ranking from './components/pages/Ranking';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import TermsOfService from './components/pages/TermsOfService';

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
      } else {
        console.log('no current user');
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  const AuthContextValue = useMemo(() => ({ 
      loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser 
    }), [loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser]);

  return (
    <AuthContext.Provider
    value={AuthContextValue}
    >
      <Router>
        <CommonLayout>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/termsofservice" element={<TermsOfService />} />
            <Route path="/" element={<TopPage />} />
            <Route path="/password" element={<PasswordReset />} />
            <Route path="/password/reset" element={<EditPassword />} />
            <Route
              path="/picture"
              element={
                <RouteAuthGuard component={<Canvas />} redirect="/signin" />
              }
            />
            <Route
              path="/pictures/:id"
              element={
                <RouteAuthGuard
                  component={<ShowPicture />}
                  redirect="/signin"
                />
              }
            />
            <Route path="/pictures/:id/twitter" element={<TwitterAnswer />} />
            <Route
              path="/themes"
              element={
                <RouteAuthGuard component={<ThemeIndex />} redirect="/signin" />
              }
            />
            <Route
              path="/ranking"
              element={
                <RouteAuthGuard component={<Ranking />} redirect="/signin" />
              }
            />
            <Route
              path="/themes/:id"
              element={
                <RouteAuthGuard component={<Theme />} redirect="/signin" />
              }
            />
            <Route
              path="/users/:id"
              element={
                <RouteAuthGuard component={<ShowUser />} redirect="/signin" />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CommonLayout>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
