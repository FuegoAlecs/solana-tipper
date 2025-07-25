// src/config.ts
import { cookieStorage, createConfig, http } from "@account-kit/react";
import { Connection } from "@solana/web3.js";
import { sepolia } from "@account-kit/infra";

// Load environment variables
const VITE_ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;
const VITE_ALCHEMY_POLICY_ID = import.meta.env.VITE_ALCHEMY_POLICY_ID;

if (!VITE_ALCHEMY_API_KEY) {
  throw new Error("Missing VITE_ALCHEMY_API_KEY in environment variables. Please check your .env file.");
}

// Create and export the final configuration object
export const config = createConfig({
  // Required
  rpcUrl: `https://eth-sepolia.g.alchemy.com/v2/${VITE_ALCHEMY_API_KEY}`,
  chain: sepolia,
  // Optional
  ssr: true,
  storage: cookieStorage,
  // Required for features below
  solana: {
    connection: new Connection(
      `https://solana-devnet.g.alchemy.com/v2/${VITE_ALCHEMY_API_KEY}`,
      {
        wsEndpoint: "wss://api.devnet.solana.com",
        commitment: "confirmed",
      }
    ),
    policyId: VITE_ALCHEMY_POLICY_ID,
  },
  auth: {
    sections: [
      [{ type: "email" }],
      [
        { type: "passkey" },
        { type: "social", authProviderId: "google", mode: "popup" },
        { type: "social", authProviderId: "facebook", mode: "popup" },
      ],
      [
        {
          type: "external_wallets",
          walletConnect: { projectId: "c3d940c25ca8483a697d6fcd47363116" },
        },
      ],
    ],
    addPasskeyOnSignup: false,
  },
});
