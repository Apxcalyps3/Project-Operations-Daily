import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// 1. Import your Page Components
import HomePage from './pages/HomePage';
import SolverPage from './pages/SolverPage';

// 2. Import your Assets
import logoMain from './assets/logo-main.png';

function App() {
  return (
    // HashRouter is essential for GitHub Pages to work without 404 errors
    <Router>
      <div className="relative min-h-screen selection:bg-green-900 selection:text-white overflow-x-hidden">
        
        {/* The perspective grid from Page 15 of your PDF */}
        <div className="perspective-grid" />

        {/* Main UI Container */}
        <div className="relative z-10 flex flex-col items-center pt-8">
          
          {/* Official Logo Header */}
          <header className="mb-8 px-4 flex justify-center">
            <img 
              src={logoMain} 
              alt="Operations Daily" 
              className="w-full max-w-[450px] h-auto drop-shadow-[0_0_15px_rgba(74,222,128,0.3)]" 
            />
          </header>

          {/* Page Routing logic based on your Flowchart */}
          <main className="w-full max-w-7xl px-4 pb-20">
            <Routes>
              {/* Home Page (Page 1 in PDF) */}
              <Route path="/" element={<HomePage />} />
              
              {/* Solver Selection Page (Page 2 in PDF) */}
              <Route path="/solver" element={<SolverPage />} />

              {/* Placeholder for future pages from your flowchart */}
              <Route path="/challenge" element={<div className="text-center text-2xl mt-10">DAILY CHALLENGE COMING SOON...</div>} />
              <Route path="/history" element={<div className="text-center text-2xl mt-10">HISTORY SYSTEM OFFLINE...</div>} />
              <Route path="/settings" element={<div className="text-center text-2xl mt-10">SETTINGS ACCESS DENIED...</div>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;