// src/App.jsx
import React, { useState, useEffect } from 'react';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { useUser, useAuthModal, useSolanaConnection, useSolanaTransaction } from '@account-kit/react';

function App() {
  const { openAuthModal } = useAuthModal();
  const { signer } = useSolanaConnection();
  const { sendTransaction, isPending } = useSolanaTransaction();
  const { user } = useUser();
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
      const amountInLamports = tipAmount * 1e9;
      const result = await sendTransaction({
        transfer: {
          amount: amountInLamports,
          toAddress: recipientAddress,
        },
      });

      console.log('Transaction sent successfully:', result);
      setTipStatus(`Success! Transaction ID: ${result.hash.substring(0, 10)}...`);
      setTimeout(() => setTipStatus(''), 5000);
    } catch (error) {
      console.error('Error sending tip:', error);
      setTipStatus(`Error: ${error.message || error.toString()}`);
    }
  };

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          maxWidth: '28rem',
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          textAlign: 'center'
        }}>
          <div style={{
            margin: '0 auto 1rem',
            width: '4rem',
            height: '4rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '2rem', width: '2rem', color: 'white' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '0.5rem' }}>Solana Tipper</h1>
          <p style={{ color: '#4B5563', marginBottom: '1.5rem' }}>Connect your wallet to start tipping</p>
          <button
            onClick={openAuthModal}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              fontWeight: '600',
              padding: '0.75rem 1.5rem',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.3s',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.9'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            Sign In
          </button>
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>Powered by Alchemy Smart Wallets</p>
            <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.25rem' }}>Enjoy gasless transactions!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '1rem',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
        <header style={{
          padding: '1.5rem 0',
          textAlign: 'center',
          marginBottom: '2rem',
          borderBottom: '1px solid #E5E7EB'
        }}>
          <h1 style={{
            fontSize: '2.25rem',
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '2rem', width: '2rem', marginRight: '0.5rem', color: '#6366F1' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Solana Tipper
          </h1>
          <div style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#6366F1',
            backgroundColor: '#EEF2FF',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            display: 'inline-block'
          }}>
            1 SOL = ${solPrice.toFixed(2)} USD
          </div>
        </header>

        <main style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '1rem'
            }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1F2937', marginBottom: '0.25rem' }}>Your Wallet</h2>
                <p style={{ fontSize: '0.875rem', color: '#4B5563', wordBreak: 'break-all' }}>{signer?.address}</p>
              </div>
              <div style={{ flexShrink: 0 }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  backgroundColor: '#DCFCE7',
                  color: '#166534'
                }}>
                  <svg style={{ height: '0.5rem', width: '0.5rem', marginRight: '0.375rem', color: '#4ADE80' }} fill="currentColor" viewBox="0 0 8 8">
                    <circle cx={4} cy={4} r={3} />
                  </svg>
                  Connected
                </span>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1F2937', marginBottom: '1.5rem', textAlign: 'center' }}>Send a Tip</h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="recipient" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                Recipient Address
              </label>
              <input
                id="recipient"
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="Enter Solana wallet address"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  border: `1px solid ${isValidAddress ? '#D1D5DB' : '#EF4444'}`,
                  focus: {
                    outline: 'none',
                    ring: '2px',
                    ringColor: isValidAddress ? '#6366F1' : '#EF4444',
                    borderColor: isValidAddress ? '#6366F1' : '#EF4444'
                  }
                }}
              />
              {!isValidAddress && (
                <p style={{
                  marginTop: '0.5rem',
                  fontSize: '0.875rem',
                  color: '#DC2626',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <svg style={{ height: '1.25rem', width: '1.25rem', marginRight: '0.375rem', color: '#EF4444' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Invalid Solana address
                </p>
              )}
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label htmlFor="amount" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                Tip Amount (SOL)
              </label>
              <div style={{ position: 'relative', marginTop: '0.25rem', borderRadius: '0.375rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                <input
                  id="amount"
                  type="number"
                  value={tipAmount}
                  onChange={(e) => setTipAmount(parseFloat(e.target.value) || 0)}
                  min="0.0001"
                  step="0.0001"
                  style={{
                    width: '100%',
                    padding: '0.75rem 3rem 0.75rem 2.5rem',
                    borderRadius: '0.75rem',
                    border: '1px solid #D1D5DB',
                    focus: {
                      outline: 'none',
                      ring: '2px',
                      ringColor: '#6366F1',
                      borderColor: '#6366F1'
                    }
                  }}
                />
                <div style={{ position: 'absolute', insetY: 0, left: 0, paddingLeft: '0.75rem', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
                  <span style={{ color: '#6B7280', fontSize: '0.875rem' }}>◎</span>
                </div>
                <div style={{ position: 'absolute', insetY: 0, right: 0, paddingRight: '0.75rem', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
                  <span style={{ color: '#6B7280', fontSize: '0.875rem' }}>SOL</span>
                </div>
              </div>
              <div style={{ marginTop: '0.5rem', textAlign: 'right', fontSize: '0.875rem', color: '#6B7280' }}>
                ≈ ${(tipAmount * solPrice).toFixed(4)} USD
              </div>
            </div>

            <button
              onClick={handleTip}
              disabled={isPending || !recipientAddress || !isValidAddress}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '9999px',
                fontWeight: '600',
                focus: { outline: 'none', ring: '2px', ringOffset: '2px' },
                transition: 'all 0.3s ease',
                cursor: (isPending || !recipientAddress || !isValidAddress) ? 'not-allowed' : 'pointer',
                backgroundColor: (isPending || !recipientAddress || !isValidAddress)
                  ? '#D1D5DB'
                  : 'linear-gradient(135deg, #8B5CF6, #EC4899)',
                color: 'white',
                border: 'none'
              }}
            >
              {isPending ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg className="animate-spin" style={{ height: '1.25rem', width: '1.25rem', marginRight: '0.75rem', color: 'white' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending Tip...
                </span>
              ) : `Send ${tipAmount} SOL Tip`}
            </button>

            {tipStatus && (
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                borderRadius: '0.75rem',
                textAlign: 'center',
                fontWeight: '500',
                backgroundColor: tipStatus.includes('Success') ? '#F0FDF4' : '#FEF2F2',
                color: tipStatus.includes('Success') ? '#166534' : '#B91C1C',
                border: `1px solid ${tipStatus.includes('Success') ? '#BBF7D0' : '#FECACA'}`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {tipStatus.includes('Success') ? (
                    <svg style={{ height: '1.25rem', width: '1.25rem', marginRight: '0.5rem', color: '#22C55E' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg style={{ height: '1.25rem', width: '1.25rem', marginRight: '0.5rem', color: '#EF4444' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span>{tipStatus}</span>
                </div>
              </div>
            )}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={openAuthModal}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: 'white',
                color: '#6366F1',
                fontWeight: '500',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                border: '1px solid #C7D2FE',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#EEF2FF';
                e.target.style.color = '#4F46E5';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = '#6366F1';
              }}
            >
              <svg style={{ height: '1.25rem', width: '1.25rem', marginRight: '0.5rem', color: '#6366F1' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Manage Account / Disconnect
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;