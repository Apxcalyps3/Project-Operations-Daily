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
    /* This container centers everything */
    <div className="flex justify-center w-full mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full max-w-6xl px-10">
        {menuItems.map((item, index) => (
          <div key={index} className="flex justify-center">
            <Window 
              iconSrc={item.src} 
              altText={item.alt} 
              onClick={() => navigate(item.path)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;