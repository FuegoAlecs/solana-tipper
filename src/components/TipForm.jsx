import React from 'react';

const TipForm = ({
  recipientAddress,
  setRecipientAddress,
  isValidAddress,
  tipAmount,
  setTipAmount,
  solPrice,
  handleTip,
  isPending,
  tipStatus,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Send a Tip</h2>

      <div className="mb-6">
        <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-2">
          Recipient Address
        </label>
        <input
          id="recipient"
          type="text"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          placeholder="Enter Solana wallet address"
          className={`w-full py-3 px-4 rounded-xl border ${
            isValidAddress ? 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500' : 'border-red-500 focus:ring-red-500 focus:border-red-500'
          } focus:outline-none focus:ring-2`}
        />
        {!isValidAddress && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <svg className="h-5 w-5 mr-1.5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Invalid Solana address
          </p>
        )}
      </div>

      <div className="mb-8">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
          Tip Amount (SOL)
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <input
            id="amount"
            type="number"
            value={tipAmount}
            onChange={(e) => setTipAmount(parseFloat(e.target.value) || 0)}
            min="0.0001"
            step="0.0001"
            className="w-full py-3 px-4 pl-10 pr-12 rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 text-sm">◎</span>
          </div>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 text-sm">SOL</span>
          </div>
        </div>
        <div className="mt-2 text-right text-sm text-gray-500">
          ≈ ${(tipAmount * solPrice).toFixed(4)} USD
        </div>
      </div>

      <button
        onClick={handleTip}
        disabled={isPending || !recipientAddress || !isValidAddress}
        className="w-full py-3 px-4 rounded-full font-semibold text-white transition-all duration-300 ease-in-out cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
      >
        {isPending ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending Tip...
          </span>
        ) : `Send ${tipAmount} SOL Tip`}
      </button>

      {tipStatus && (
        <div className={`mt-4 p-4 rounded-xl text-center font-medium ${
          tipStatus.includes('Success') ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'
        } border`}>
          <div className="flex items-center justify-center">
            {tipStatus.includes('Success') ? (
              <svg className="h-5 w-5 mr-2 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="h-5 w-5 mr-2 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            <span>{tipStatus}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TipForm;
