// src/App.jsx
import React, { useState, useEffect } from 'react';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { useAuthModal, useSolanaTransaction } from '@account-kit/react';

const styles = {
  darkBody: {
    backgroundColor: '#1a1a1a',
    color: '#f5f5f5',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Inter', sans-serif",
  },
  container: {
    maxWidth: '420px',
    width: '100%',
    padding: '2rem',
    backgroundColor: '#2a2a2a',
    borderRadius: '1.5rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  button: {
    width: '100%',
    background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
    color: 'white',
    fontWeight: '600',
    padding: '1rem 1.5rem',
    borderRadius: '9999px',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  input: {
    width: '100%',
    padding: '1rem',
    borderRadius: '0.75rem',
    border: '1px solid #4a4a4a',
    backgroundColor: '#3a3a3a',
    color: '#f5f5f5',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#a0a0a0',
    marginBottom: '0.5rem',
  },
};

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
      setTipStatus(`Success! Transaction ID: ${result.hash.substring(0, 10)}...`);
      setTimeout(() => setTipStatus(''), 5000);
    } catch (error) {
      setTipStatus(`Error: ${error.message || error.toString()}`);
    }
  };

  if (!signer) {
    return (
      <div style={styles.darkBody}>
        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white' }}>Solana Tipper</h1>
            <p style={{ color: '#a0a0a0' }}>Connect your wallet to start tipping</p>
          </div>
          <button
            onClick={openAuthModal}
            style={styles.button}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'none';
              e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}
          >
            Sign In with Alchemy
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.darkBody}>
      <div style={styles.container}>
        <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white' }}>Solana Tipper</h1>
          <p style={{ color: '#a0a0a0' }}>1 SOL = ${solPrice.toFixed(2)} USD</p>
        </header>

        <main>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="recipient" style={styles.label}>Recipient Address</label>
            <input
              id="recipient"
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="Enter Solana wallet address"
              style={{
                ...styles.input,
                borderColor: isValidAddress ? '#4a4a4a' : '#EF4444',
              }}
            />
            {!isValidAddress && <p style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '0.5rem' }}>Invalid Solana address</p>}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            .
            <label htmlFor="amount" style={styles.label}>Tip Amount (SOL)</label>
            <input
              id="amount"
              type="number"
              value={tipAmount}
              onChange={(e) => setTipAmount(parseFloat(e.target.value) || 0)}
              min="0.0001"
              step="0.0001"
              style={styles.input}
            />
            <p style={{ color: '#a0a0a0', fontSize: '0.75rem', marginTop: '0.5rem', textAlign: 'right' }}>
              ≈ ${(tipAmount * solPrice).toFixed(4)} USD
            </p>
          </div>

          <button
            onClick={handleTip}
            disabled={isPending || !recipientAddress || !isValidAddress}
            style={{
              ...styles.button,
              cursor: (isPending || !recipientAddress || !isValidAddress) ? 'not-allowed' : 'pointer',
              opacity: (isPending || !recipientAddress || !isValidAddress) ? 0.5 : 1,
            }}
          >
            {isPending ? 'Sending...' : `Send ${tipAmount} SOL`}
          </button>

          {tipStatus && (
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              borderRadius: '0.75rem',
              textAlign: 'center',
              backgroundColor: tipStatus.includes('Success') ? 'rgba(52, 211, 153, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              color: tipStatus.includes('Success') ? '#34D399' : '#EF4444',
              wordBreak: 'break-word',
            }}>
              {tipStatus}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              onClick={openAuthModal}
              style={{
                background: 'none',
                border: 'none',
                color: '#a0a0a0',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Manage Account / Disconnect
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;