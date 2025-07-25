import React from 'react';

const UserInfo = ({ address }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Your Wallet</h2>
          <p className="text-sm text-gray-500 break-all">{address}</p>
        </div>
        <div className="flex-shrink-0">
          <span className="inline-flex items-center py-1 px-3 rounded-full text-sm font-medium bg-green-100 text-green-700">
            <svg className="h-2 w-2 mr-1.5 text-green-500" fill="currentColor" viewBox="0 0 8 8">
              <circle cx={4} cy={4} r={3} />
            </svg>
            Connected
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
