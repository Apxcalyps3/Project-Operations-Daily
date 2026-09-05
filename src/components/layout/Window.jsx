import React from 'react';

const Window = ({ title, children, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="retro-window group border-2 border-retro-green bg-black/80 rounded-lg overflow-hidden cursor-pointer hover:shadow-[0_0_20px_rgba(74,222,128,0.3)] transition-all duration-300 flex flex-col"
    >
      {/* Top Bar (Mac-style) */}
      <div className="bg-dark-green/50 border-b-2 border-retro-green p-2 flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-retro-green/30"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-retro-green/30"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-retro-green/30"></div>
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-retro-green/80">
          {title}
        </span>
      </div>

      {/* Content Area */}
      <div className="p-8 flex flex-col items-center justify-center flex-grow group-hover:bg-retro-green/5 transition-colors">
        {children}
      </div>
    </div>
  );
};

export default Window;