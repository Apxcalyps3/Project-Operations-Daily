import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import SolverPage from './pages/SolverPage';
import DailyChallengePage from './pages/DailyChallengePage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import logoMain from './assets/logo-main.png';
import LPSolverPage from './pages/LPSolverPage';

function App() {
  return (
    <Router>
      {/* Selection:bg ensures text highlights are green */}
      <div className="relative min-h-screen w-full selection:bg-green-900 selection:text-white">
        
        {/* Background Grid */}
        <div className="perspective-grid" />

        {/* This main wrapper centers everything on the screen */}
        <div className="relative z-10 w-full flex flex-col items-center pt-10 px-4">
          
          {/* Header Logo - Centered */}
          <header className="mb-12 w-full flex justify-center">
            <img 
              src={logoMain} 
              alt="Operations Daily" 
              className="w-full max-w-[500px] h-auto drop-shadow-[0_0_20px_rgba(74,222,128,0.2)]" 
            />
          </header>

          {/* Page Content - Also Centered */}
          <main className="w-full max-w-7xl flex justify-center">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/solver" element={<SolverPage />} />
              <Route path="/challenge" element={<DailyChallengePage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/solver/lp" element={<LPSolverPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;