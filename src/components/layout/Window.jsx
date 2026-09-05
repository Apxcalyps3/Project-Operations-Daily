import React from 'react';

const Window = ({ iconSrc, onClick, altText }) => {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:brightness-110 active:scale-95"
    >
      <img 
        src={iconSrc} 
        alt={altText} 
        className="w-full h-auto drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(74,222,128,0.4)]"
      />
    </div>
  );
};

export default Window;