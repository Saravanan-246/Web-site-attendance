import React from 'react';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

const Profile = () => {
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <div className="flex items-center space-x-4">
      {isLoggedIn ? (
        <>
          <p className="text-gray-700">Welcome, <span className="font-semibold">{user.name}</span></p>
          <Button onClick={logout}>Logout</Button>
        </>
      ) : (
        <p className="text-gray-500">Please login</p>
      )}
    </div>
  );
};

export default Profile;
