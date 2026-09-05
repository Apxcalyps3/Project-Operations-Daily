import React from 'react';
import { useNavigate } from 'react-router-dom';

const HistoryPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
      <h2 className="text-4xl font-bold mb-4 tracking-[0.3em] text-retro-green uppercase">Solver History</h2>
      <p className="text-xl mb-10 opacity-50 uppercase tracking-widest">Logs Encrypted: Decryption Key Not Found</p>
      <button 
        onClick={() => navigate('/')}
        className="text-retro-green border-2 border-retro-green px-6 py-2 hover:bg-retro-green hover:text-black transition-all font-bold tracking-widest uppercase"
      >
        &lt; RETURN TO MAIN SYSTEM
      </button>
    </div>
  );
};

export default HistoryPage;