import React from 'react';
import Profile from './Profile';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  return (
    <div className="h-16 bg-white dark:bg-gray-800 shadow flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Admin Portal</h2>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <Profile />
      </div>
    </div>
  );
};

export default Navbar;
