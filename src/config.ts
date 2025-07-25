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
      `https://solana-devnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      {
        wsEndpoint: "wss://api.devnet.solana.com",
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

// Create config with both core and UI configurations
// The order is important: coreConfig first, uiConfig second
export const config = createConfig(coreConfig, uiConfig);