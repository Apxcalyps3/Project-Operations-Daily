import React from 'react';
import { useNavigate } from 'react-router-dom';
import Window from '../components/layout/Window';

// Import the specific icons for LP and IP
import iconLP from '../assets/icons/icon-lpsolver.png';
import iconIP from '../assets/icons/icon-ipsolver.png';

const SolverPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center animate-in fade-in duration-500">
      {/* Navigation Back Button */}
      <button 
        onClick={() => navigate('/')}
        className="mb-12 text-retro-green border-2 border-retro-green px-6 py-2 hover:bg-retro-green hover:text-black transition-all font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(74,222,128,0.2)]"
      >
        &lt; RETURN TO MAIN SYSTEM
      </button>

      {/* Grid for LP vs IP selection (Page 2 of PDF) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl px-4">
        <Window 
          iconSrc={iconLP} 
          altText="Linear Programming Solver" 
          onClick={() => navigate('/solver/lp')} 
        />
        <Window 
          iconSrc={iconIP} 
          altText="Integer Programming Solver" 
          onClick={() => navigate('/solver/ip')} 
        />
      </div>
      
      <p className="mt-12 text-retro-green/40 text-xs tracking-[0.3em] uppercase">
        Select processing module to continue...
      </p>
    </div>
  );
};

export default SolverPage;