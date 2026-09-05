import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ backTo = '/', label = 'RETURN TO SYSTEM' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/') return null;

  return (
    <nav style={{ width: '100%', maxWidth: '880px', display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem' }}>
      <button
        onClick={() => navigate(backTo)}
        className="nav-back-button"
        title="Go back"
      >
        <span>&larr;</span>
        <span>{label}</span>
      </button>
    </nav>
  );
};

export default Navbar;
