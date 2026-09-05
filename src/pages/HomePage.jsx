import React from 'react';
import Window from '../components/layout/Window';

const HomePage = () => {
  const menuItems = [
    { title: 'Simplex Solver', icon: '📟' },
    { title: 'Daily Challenge', icon: '🔥' },
    { title: 'History', icon: '🕒' },
    { title: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in zoom-in duration-700">
      {menuItems.map((item) => (
        <Window key={item.title} title={item.title}>
          <span className="text-6xl mb-4 group-hover:scale-110 transition-transform">
            {item.icon}
          </span>
          <h2 className="text-sm font-bold tracking-widest text-center uppercase opacity-70">
            {item.title}
          </h2>
        </Window>
      ))}
    </div>
  );
};

export default HomePage;