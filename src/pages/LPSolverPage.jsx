import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LPSolverPage = () => {
  const navigate = useNavigate();
  const [numVariables, setNumVariables] = useState(2);
  
  return (
    <div className="w-full max-w-4xl border-2 border-retro-green bg-black/90 p-6 rounded-lg shadow-[0_0_30px_rgba(74,222,128,0.1)]">
      {/* Window Header */}
      <div className="flex items-center justify-between border-b-2 border-retro-green pb-4 mb-6">
        <div className="flex gap-2">
          <button onClick={() => navigate('/solver')} className="text-retro-green hover:brightness-150 font-bold">
            &lt; BACK
          </button>
          <span className="ml-4 tracking-[0.3em] font-bold uppercase">LP SOLVER: SIMPLEX METHOD</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-green-900"></div>
          <div className="w-3 h-3 rounded-full bg-green-700"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>

      {/* Variables Selection */}
      <div className="mb-8">
        <label className="block text-xs tracking-widest mb-2 opacity-60 uppercase">Number of Variables</label>
        <div className="flex items-center gap-4">
          <button onClick={() => setNumVariables(Math.max(2, numVariables - 1))} className="bg-dark-green border border-retro-green px-3 py-1">-</button>
          <span className="text-2xl font-bold w-8 text-center">{numVariables}</span>
          <button onClick={() => setNumVariables(numVariables + 1)} className="bg-dark-green border border-retro-green px-3 py-1">+</button>
        </div>
      </div>

      {/* Objective Function */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <select className="bg-black border border-retro-green text-retro-green p-1 outline-none uppercase font-bold">
            <option>MAXIMIZE</option>
            <option>MINIMIZE</option>
          </select>
          <span className="text-xl font-bold">Z =</span>
          <div className="flex items-center gap-2">
            <input type="number" placeholder="0" className="w-16 bg-dark-green border border-retro-green p-2 text-center outline-none" />
            <span className="font-bold">X₁ +</span>
            <input type="number" placeholder="0" className="w-16 bg-dark-green border border-retro-green p-2 text-center outline-none" />
            <span className="font-bold">X₂</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 border-t border-retro-green/30 pt-6">
        <button className="flex-1 bg-retro-green text-black font-bold py-3 hover:brightness-110 tracking-widest uppercase">
          Run Analysis
        </button>
        <button className="flex-1 border border-retro-green text-retro-green font-bold py-3 hover:bg-retro-green/10 tracking-widest uppercase">
          Add Constraint
        </button>
      </div>
    </div>
  );
};

export default LPSolverPage;