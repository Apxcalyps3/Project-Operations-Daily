import React from 'react';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] text-center animate-pulse">
      <h2 className="text-4xl font-bold mb-4 tracking-[0.3em] text-retro-green">SETTINGS</h2>
      <p className="text-xl mb-10 opacity-50 uppercase tracking-widest">Access Denied: Administrative Privileges Required</p>
      <button 
        onClick={() => navigate('/')}
        className="text-retro-green border-2 border-retro-green px-6 py-2 hover:bg-retro-green hover:text-black transition-all font-bold tracking-widest uppercase"
      >
        &lt; RETURN TO MAIN SYSTEM
      </button>
    </div>
  );
};

export default SettingsPage; // This line is what was missing!