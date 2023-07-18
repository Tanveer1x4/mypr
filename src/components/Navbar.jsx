import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../app/features/userSlice';

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    // Perform any additional logout logic, such as clearing local storage, etc.
  };

  return (
    <nav style={{ backgroundColor: 'lightblue', height: '60px' }}>
    <button
      style={{
        backgroundColor: 'white',
        color: 'black',
        border: 'none',
        margin:'2px',
        padding: '12px 16px', /* Adjust the padding as desired */
        borderRadius: '4px',
        cursor: 'pointer',
      }}
      onClick={handleLogout}
    >
      Logout
    </button>
  </nav>
  
  );
};

export default Navbar;
