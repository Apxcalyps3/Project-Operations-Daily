import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import SolverPage from './pages/SolverPage';
import LPSolverPage from './pages/LPSolverPage';
import IPSolverPage from './pages/IPSolverPage';
import DailyChallengePage from './pages/DailyChallengePage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';

import Header from './components/layout/Header';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          {/* Retro 3D perspective grid occupying the bottom 70% with fade-out effect */}
          <div className="perspective-grid" />

          {/* Main Centered Application Shell */}
          <div className="main-container">
            {/* Header with Logo linking to / */}
            <Header />

            {/* Application Flowchart Routes */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/solver" element={<SolverPage />} />
              <Route path="/solver/lp" element={<LPSolverPage />} />
              <Route path="/solver/ip" element={<IPSolverPage />} />
              <Route path="/challenge" element={<DailyChallengePage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;