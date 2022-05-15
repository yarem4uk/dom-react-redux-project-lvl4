import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Navbar.jsx';
import PageNotFound from './PageNotFound.jsx';
import LoginPage from './LoginPage.jsx';
import Chat from './Chat.jsx';

import AuthContext from '../contexts/index.jsx';
import useAuth from '../hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => {
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthRoute = ({ children }) => {
  const auth = useAuth();
  const user = localStorage.getItem('user');
  return user || auth.loggedIn ? <Chat /> : children;
};

const App = () => {
  return (
    <AuthProvider>
      <div className="d-flex flex-column h-100">
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <AuthRoute>
                  <LoginPage />
                </AuthRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </div>
      <div className="Toastify" />
    </AuthProvider>
  );
};

export default App;
