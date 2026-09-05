import React from 'react';
import { useNavigate } from 'react-router-dom';
import Window from '../components/layout/Window';

import iconSolver from '../assets/icons/icon-solver.png';
import iconChallenge from '../assets/icons/icon-challenge.png';
import iconHistory from '../assets/icons/icon-history.png';
import iconSettings from '../assets/icons/icon-settings.png';

const HomePage = () => {
  const navigate = useNavigate();

  const menuItems = [
    { src: iconSolver, path: '/solver', alt: 'Simplex Solver' },
    { src: iconChallenge, path: '/challenge', alt: 'Daily Challenge' },
    { src: iconHistory, path: '/history', alt: 'History' },
    { src: iconSettings, path: '/settings', alt: 'Settings' },
  ];

  return (
    <div className="flex justify-center w-full mt-10">
      {/* We use icon-grid to ensure icons sit in a row */}
      <div className="icon-grid px-10">
        {menuItems.map((item, index) => (
          <Window 
            key={index}
            iconSrc={item.src}
            altText={item.alt}
            onClick={() => navigate(item.path)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;