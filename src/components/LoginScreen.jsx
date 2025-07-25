import React from 'react';

const LoginScreen = ({ openAuthModal }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-2xl text-center">
        <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Solana Tipper</h1>
        <p className="text-gray-600 mb-6">Connect your wallet to start tipping</p>
        <button
          onClick={openAuthModal}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-full border-none cursor-pointer transition-transform transform hover:scale-105 shadow-lg"
        >
          Sign In
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">Powered by Alchemy Smart Wallets</p>
          <p className="text-sm text-gray-500 mt-1">Enjoy gasless transactions!</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
