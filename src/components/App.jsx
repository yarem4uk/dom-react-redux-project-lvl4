import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';

import { useDispatch } from 'react-redux';

import Navbar from './Navbar.jsx';
import PageNotFound from './PageNotFound.jsx';
import LoginPage from './LoginPage.jsx';
import Chat from './Chat.jsx';

import { fetchChannels } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

import { AuthContext, SocketContext } from '../contexts/index.jsx';
import { useAuth, useSocket } from '../hooks/index.jsx';

const isProduction = process.env.NODE_ENV === 'production';
const domain = isProduction ? '' : 'http://localhost:5000';
const socket = io(domain);

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

// const SocketProvider = ({ children }) => {
//   const isProduction = process.env.NODE_ENV === 'production';
//   const domain = isProduction ? '' : 'http://localhost:4000';
//   const socket = io(domain);
//   return (
//     <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
//   );
// };

const AuthRoute = ({ children }) => {
  const auth = useAuth();
  const user = localStorage.getItem('user');
  return user || auth.loggedIn ? <Chat /> : children;
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch]);

  socket.on('newMessage', (data) => {
    console.log('socket io', data);
    dispatch(messagesActions.addMessage(data));
  });

  return (
    <AuthProvider>
      <SocketContext.Provider value={socket}>
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
      </SocketContext.Provider>
    </AuthProvider>
  );
};

export default App;
