import React from 'react';

const Header = ({ solPrice }) => {
  return (
    <header className="py-6 text-center mb-8 border-b border-gray-200">
      <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Solana Tipper
      </h1>
      <div className="text-lg font-semibold text-indigo-600 bg-indigo-100 py-2 px-4 rounded-full inline-block">
        1 SOL = ${solPrice.toFixed(2)} USD
      </div>
    </header>
  );
};

export default Header;
