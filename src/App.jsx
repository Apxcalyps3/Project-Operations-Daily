import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import SolverPage from './pages/SolverPage';
import LPSolverPage from './pages/LPSolverPage'; // NEW
import DailyChallengePage from './pages/DailyChallengePage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import logoMain from './assets/logo-main.png';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen w-full flex justify-center">
        <div className="perspective-grid" />
        
        {/* We use 'flex-center' as a fallback for centering */}
        <div className="relative z-10 w-full flex-center pt-10 px-4">
          
          <header className="mb-12 w-full flex justify-center">
            <img src={logoMain} alt="Logo" className="w-full max-w-[450px] h-auto" />
          </header>

          <main className="w-full max-w-7xl flex justify-center">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/solver" element={<SolverPage />} />
              <Route path="/solver/lp" element={<LPSolverPage />} />
              <Route path="/challenge" element={<DailyChallengePage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;