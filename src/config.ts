// src/config.ts
import { cookieStorage, createConfig } from "@account-kit/react";
import { Connection } from "@solana/web3.js";
import { sepolia, alchemy } from "@account-kit/infra";

// Load environment variables
export const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;
export const ALCHEMY_POLICY_ID = import.meta.env.VITE_ALCHEMY_POLICY_ID;

if (!ALCHEMY_API_KEY) {
  throw new Error("Missing VITE_ALCHEMY_API_KEY in environment variables. Please check your .env file.");
}

// Core configuration (first parameter)
const coreConfig = {
  transport: alchemy({ apiKey: ALCHEMY_API_KEY }),
  chain: sepolia, // Required EVM chain
  storage: cookieStorage,
  solana: {
    connection: new Connection(
      `https://solana-devnet.g.alchemy.com/solana/v1/${ALCHEMY_API_KEY}`,
      {
        commitment: "confirmed",
      }
    ),
    policyId: ALCHEMY_POLICY_ID, // Global gas sponsorship
  },
};

// UI configuration (second parameter)
// This is required for useAuthModal to work
const uiConfig = {
  auth: {
    sections: [
      // Social login section
      [
        { type: "social", authProviderId: "google", mode: "popup" }
      ],
      // Email and Passkey section
      [
        { type: "email" },
        { type: "passkey" }
      ]
    ],
    addPasskeyOnSignup: true,
  },
  theme: {
    mode: "light"
  },
  illustrationStyle: "outline"
};

// Create and export the final configuration object
// It's crucial to merge the core and UI configs into one object
export const config = createConfig({
  ...coreConfig, // Spread the core configuration
  ...uiConfig,   // Spread the UI configuration
});
