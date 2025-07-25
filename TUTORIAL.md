# Solana Tipper Tutorial

Welcome to the Solana Tipper tutorial! This guide will walk you through the process of setting up and running this application, and explain how it works.

## 1. Project Overview

Solana Tipper is a simple web application that allows you to send SOL (the native cryptocurrency of the Solana blockchain) to any Solana wallet address. It's built with React, Vite, and Tailwind CSS, and it uses Alchemy's Account Kit to handle wallet connections and transactions.

## 2. Getting Started

Follow these steps to get the application running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) (or your preferred package manager)
- A modern web browser

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/solana-tipper.git
   cd solana-tipper
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up your environment variables:**

   Create a `.env` file in the root of the project and add your Alchemy API key:

   ```
   VITE_ALCHEMY_API_KEY=your_alchemy_api_key
   ```

   You can get an Alchemy API key by signing up for a free account at [alchemy.com](https://www.alchemy.com/).

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   This will start the application on `http://localhost:5173`.

## 3. How It Works

The application is divided into several components that work together to provide the tipping functionality.

### Key Components

- **`App.jsx`**: The main component that manages the application's state and logic.
- **`LoginScreen.jsx`**: The component that is displayed when the user is not connected to a wallet.
- **`Header.jsx`**: The component that displays the application's title and the current price of SOL.
- **`UserInfo.jsx`**: The component that displays the connected user's wallet address.
- **`TipForm.jsx`**: The component that allows the user to enter the recipient's address and the amount of SOL to tip.
- **`AccountActions.jsx`**: The component that allows the user to manage their account or disconnect from their wallet.

### Core Concepts

- **Alchemy Account Kit**: This is a library that simplifies the process of connecting to and interacting with a user's wallet. It provides hooks like `useAuthModal` and `useSolanaTransaction` that make it easy to handle authentication and send transactions.
- **Solana Web3.js**: This is the official JavaScript library for interacting with the Solana blockchain. It's used to create `PublicKey` objects and construct the transaction instructions.
- **Gasless Transactions**: Thanks to Alchemy's Smart Wallets, users can enjoy gasless transactions, which means they don't have to pay any fees to send tips.

### Tipping Logic

1. **Connect Wallet**: The user clicks the "Sign In" button, which opens Alchemy's authentication modal.
2. **Enter Recipient and Amount**: The user enters the recipient's Solana wallet address and the amount of SOL they want to tip.
3. **Send Tip**: The user clicks the "Send Tip" button, which triggers the `handleTip` function in `App.jsx`.
4. **Construct Transaction**: The `handleTip` function creates a `SystemProgram.transfer` instruction with the sender's address, the recipient's address, and the amount to tip.
5. **Send Transaction**: The `sendTransaction` function from the `useSolanaTransaction` hook is called with the transaction instructions. This sends the transaction to the Solana blockchain for processing.
6. **Display Status**: The application displays a success or error message to the user, depending on the outcome of the transaction.

## 4. Customization

You can customize the application by modifying the following files:

- **`tailwind.config.js`**: To change the color scheme, fonts, and other design tokens.
- **`src/App.jsx`**: To change the application's logic or add new features.
- **`src/components/*.jsx`**: To change the appearance or behavior of individual components.

---

We hope this tutorial has been helpful! If you have any questions or feedback, please feel free to open an issue on GitHub.
