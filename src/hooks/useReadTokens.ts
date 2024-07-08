import { useAccount, useReadContracts } from "wagmi";
import { balanceOfAbi } from "@/abi";
import { useState, useEffect } from "react";
import { arbitrum, mainnet, polygon } from "wagmi/chains";

const tokenAddresses = {
  [mainnet.id]: [
    "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // USDC
    "0xD533a949740bb3306d119CC777fa900bA034cd52", // CRV
  ],
  [arbitrum.id]: [
    "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    "0x11cDb42B0EB46D95f990BeDD4695A6e3fA034978",
  ],
  [polygon.id]: [
    "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
    "0x172370d5Cd63279eFa6d502DAB29171933a610AF",
  ],
};

export const useReadBalanceTokens = () => {
  const { address, chainId, isConnected } = useAccount();

  const [contractAddresses, setContractAddresses] = useState<string[]>(
    tokenAddresses[chainId]
  );

  useEffect(() => {
    if (!isConnected) {
      return;
    }
    setContractAddresses(tokenAddresses[chainId]);
  }, [chainId]);

  const results = useReadContracts({
    contracts: contractAddresses.map((contractAddress) => ({
      abi: balanceOfAbi,
      functionName: "balanceOf",
      address: contractAddress,
      args: [address],
    })),
    refetchOnWindowFocus: false,
  });

  return {
    results,
  };
};
