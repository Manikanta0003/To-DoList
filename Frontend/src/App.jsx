import React, { useState } from 'react';
import Login from './login';
import Dashboard from './Dashboard';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard currentUser={currentUser} onLogout={handleLogout} />
      )}
    </>
  );
};

export default App;