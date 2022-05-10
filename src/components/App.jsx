import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './Navbar.jsx';

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar />
      </div>
    </Router>
  );
};

export default App;
