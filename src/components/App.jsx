import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Navbar.jsx';
import PageNotFound from './PageNotFound.jsx';
import LoginPage from './LoginPage.jsx';

const App = () => {
  return (
    <div className="d-flex flex-column h-100">
      <Navbar />
      <Router>
        <div className="container-fluid h-100">
          <Routes>
            <Route path="/" element={null} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
