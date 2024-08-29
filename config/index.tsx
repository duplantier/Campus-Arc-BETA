import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage } from "wagmi";
import { defineChain } from "viem";
import { arbitrum } from "wagmi/chains";
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

const arbitriumSepolia = defineChain({
  id: 656476,
  name: "Arbitrum Sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "EDU",
    symbol: "EDU",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.open-campus-codex.gelato.digital"],
      webSocket: ["wss://ws.open-campus-codex.gelato.digital"],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://opencampus-codex.blockscout.com/",
    },
  },
});

if (!projectId) throw new Error("Project ID is not defined");

export const metadata = {
  name: "AppKit",
  description: "AppKit Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
const chains = [arbitriumSepolia, arbitrum] as any; // Empty array to allow all chains
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
