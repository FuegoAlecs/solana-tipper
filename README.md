# Solana Tipper

This is a simple application that allows you to tip Solana (SOL) to any Solana address. It's built with React and uses Alchemy's Account Kit for wallet management and transactions.

## Features

- **Connect with Socials**: Connect your social accounts to create a wallet.
- **Gasless Transactions**: Alchemy sponsors the gas for your transactions.
- **Real-time SOL Price**: See the current price of SOL in USD.
- **Tip SOL**: Send SOL to any Solana address.

## Getting Started

To run this project locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/alchemyplatform/solana-tipper.git
cd solana-tipper
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your environment variables

Create a `.env` file in the root of the project and add your Alchemy API key and Policy ID:

```
VITE_ALCHEMY_API_KEY="YOUR_ALCHEMY_API_KEY"
VITE_ALCHEMY_POLICY_ID="YOUR_ALCHEMY_POLICY_ID"
```

You can get your Alchemy API key and Policy ID from the [Alchemy Dashboard](https://dashboard.alchemy.com/).

### 4. Run the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Code Overview

-   **`src/main.jsx`**: The entry point of the application. It sets up the `AlchemyAccountProvider` which provides the Account Kit context to the application.
-   **`src/config.ts`**: This file configures the Alchemy Account Kit. It sets up the Alchemy API key, the Solana connection, and the UI for the authentication modal.
-   **`src/App.jsx`**: This file contains the main application logic. It uses `@account-kit/react` for authentication and transactions.
    -   **`useAuthModal()`**: This hook is used to open the sign-in modal.
    -   **`useSolanaTransaction()`**: This hook is used to send transactions.
    -   **`handleTip()`**: This function is called when the user clicks the "Send Tip" button. It validates the input, constructs the transaction, and sends it using the `sendTransaction` function from `useSolanaTransaction`.
    -   **UI**: The UI is built with React and uses inline styles for simplicity. It shows a login screen if the user is not connected, and the main application UI if the user is connected.

## How it works

1.  **Authentication**: When the user clicks the "Sign In" button, the `openAuthModal` function is called, which opens the Alchemy authentication modal. The user can then sign in with their social accounts.
2.  **Wallet**: Once the user is authenticated, a Solana wallet is created for them. The wallet address is displayed in the UI.
3.  **Tipping**: The user can enter a recipient address and a tip amount. When they click the "Send Tip" button, the `handleTip` function is called.
4.  **Transaction**: The `handleTip` function constructs a Solana transaction using the `@solana/web3.js` library. The transaction is then sent using the `sendTransaction` function from the `useSolanaTransaction` hook.
5.  **Gas Sponsorship**: The transaction is sponsored by Alchemy, so the user doesn't have to pay for gas. This is configured in `src/config.ts` with the `policyId`.

## Learn More

-   [Alchemy Account Kit](https://www.alchemy.com/docs/wallets/react)
-   [Solana Documentation](https://docs.solana.com/)
-   [React Documentation](https://reactjs.org/)
