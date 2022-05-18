import React from 'react';
import { Button } from 'react-bootstrap';

import useAuth from '../hooks/index.jsx';

const AuthButton = () => {
  const auth = useAuth();
  const user = localStorage.getItem('user');

  return user || auth.loggedIn ? (
    <Button onClick={auth.logOut}>Выйти</Button>
  ) : null;
};

// return auth.loggedIn ? (
//   <Button onClick={auth.logOut}>Log out</Button>
// ) : (
//   <Button as={Link} to="/login" state={{ from: location }}>
//     Log in
//   </Button>
// );

const Navbar = () => {
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          Slack
        </a>
        <AuthButton />
      </div>
    </nav>
  );
};

export default Navbar;
