import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { QueryClient } from "@tanstack/react-query";
import { http } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "Ethereum Wallet Interface",
  projectId: "PROJECT_ID",
  chains: [mainnet, arbitrum, polygon],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [polygon.id]: http(),
  },
});

export const queryClient = new QueryClient();
