import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import logoMain from './assets/logo-main.png';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        <div className="relative z-10 flex flex-col items-center pt-6">
          
          {/* Your Logo */}
          <header className="mb-8">
            <img 
              src={logoMain} 
              alt="Operations Daily" 
              className="w-72 md:w-[450px] h-auto drop-shadow-[0_0_15px_rgba(74,222,128,0.3)]" 
            />
          </header>

          <main className="w-full max-w-7xl px-4 pb-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* Future routes like /solver, /challenge will go here */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;