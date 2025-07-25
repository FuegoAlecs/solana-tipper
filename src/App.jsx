// src/App.jsx
import React, { useState, useEffect } from 'react';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { useAuthModal, useSolanaTransaction } from '@account-kit/react';

import LoginScreen from './components/LoginScreen';
import Header from './components/Header';
import UserInfo from './components/UserInfo';
import TipForm from './components/TipForm';
import AccountActions from './components/AccountActions';

function App() {
  const { openAuthModal } = useAuthModal();
  const { sendTransaction, isPending, signer } = useSolanaTransaction({});

  const [solPrice, setSolPrice] = useState(0);
  const [tipStatus, setTipStatus] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [tipAmount, setTipAmount] = useState(0.001);
  const [isValidAddress, setIsValidAddress] = useState(true);

  useEffect(() => {
    const fetchSolPrice = async () => {
      try {
        const response = await fetch(
          `https://api.alchemy.com/v1/prices?token=SOL&apiKey=${import.meta.env.VITE_ALCHEMY_API_KEY}`
        );
        const data = await response.json();
        setSolPrice(data.SOL.USD);
      } catch (error) {
        console.error('Error fetching SOL price:', error);
      }
    };

    fetchSolPrice();
    const interval = setInterval(fetchSolPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (recipientAddress) {
      try {
        new PublicKey(recipientAddress);
        setIsValidAddress(true);
      } catch (e) {
        setIsValidAddress(false);
      }
    } else {
      setIsValidAddress(true);
    }
  }, [recipientAddress]);

  const handleTip = async () => {
    if (!signer) {
      setTipStatus('Please connect your wallet first');
      return;
    }
    if (!recipientAddress || !isValidAddress) {
      setTipStatus('Please enter a valid recipient address');
      return;
    }

    setTipStatus('Processing tip...');

    try {
      const recipient = new PublicKey(recipientAddress);
      const amountInLamports = tipAmount * 1e9;

      const result = await sendTransaction({
        instructions: [
          SystemProgram.transfer({
            fromPubkey: new PublicKey(signer.address),
            toPubkey: recipient,
            lamports: amountInLamports,
          }),
        ],
      });

      console.log('Transaction sent successfully:', result);
      setTipStatus(`Success! Transaction ID: ${result.hash.substring(0, 10)}...`);

      setTimeout(() => setTipStatus(''), 5000);
    } catch (error) {
      console.error('Error sending tip:', error);
      setTipStatus(`Error: ${error.message || error.toString()}`);
    }
  };

  if (!signer) {
    return <LoginScreen openAuthModal={openAuthModal} />;
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="max-w-3xl mx-auto">
        <Header solPrice={solPrice} />
        <main className="flex flex-col gap-8">
          <UserInfo address={signer.address} />
          <TipForm
            recipientAddress={recipientAddress}
            setRecipientAddress={setRecipientAddress}
            isValidAddress={isValidAddress}
            tipAmount={tipAmount}
            setTipAmount={setTipAmount}
            solPrice={solPrice}
            handleTip={handleTip}
            isPending={isPending}
            tipStatus={tipStatus}
          />
          <AccountActions openAuthModal={openAuthModal} />
        </main>
      </div>
    </div>
  );
}

export default App;