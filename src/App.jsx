import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen selection:bg-green-900 selection:text-white">
        {/* Background Grid */}
        <div className="perspective-grid" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center pt-12">
          <header className="text-center mb-16 px-4">
            <div className="text-5xl mb-2 opacity-60">Φ</div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-[0.4em] uppercase text-retro-green drop-shadow-[0_0_15px_rgba(74,222,128,0.4)]">
              Operations Daily
            </h1>
          </header>

          <main className="w-full max-w-7xl px-6 pb-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;