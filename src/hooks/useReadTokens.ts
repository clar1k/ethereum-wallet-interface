import { useAccount, useReadContracts } from "wagmi";
import { ERC20Abi } from "@/abi";
import { useState, useEffect } from "react";
import { arbitrum, mainnet, polygon } from "wagmi/chains";
import { useMemo } from "react";
import { chunkArray } from "@/utils";
import { formatUnits } from "viem";

const CONTRACT_TOKEN_ADDRESSES = {
  [mainnet.id]: [
    "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "0xD533a949740bb3306d119CC777fa900bA034cd52",
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

type BalanceOfTokenResult = {
  symbol: string;
  name: string;
  balance: string;
};

export const useReadBalanceTokens = () => {
  const { address, chainId, isConnected } = useAccount();
  const [contractAddresses, setContractAddresses] = useState<string[]>(
    CONTRACT_TOKEN_ADDRESSES[chainId === undefined ? 1 : chainId]
  );
  const result = useReadContracts({
    // @ts-ignore Type instantiation is excessively deep and possibly infinite. :)
    contracts: contractAddresses
      .map((contractAddress) => {
        const contract = {
          abi: ERC20Abi,
          address: contractAddress,
        } as const;

        return [
          {
            ...contract,
            functionName: "balanceOf",
            args: [address],
          },
          {
            ...contract,
            functionName: "name",
          },
          {
            ...contract,
            functionName: "symbol",
          },
        ];
      })
      .flat(),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isConnected) {
      return;
    }
    setContractAddresses(CONTRACT_TOKEN_ADDRESSES[chainId]);
  }, [chainId]);

  const balances = useMemo<BalanceOfTokenResult[] | undefined>(() => {
    if (
      !result.isFetched ||
      !isConnected ||
      result.isError ||
      result.isFetching
    ) {
      return;
    }

    const chunkedArray = chunkArray(result.data, 3);
    const balancesResult = chunkedArray.map((item) => {
      const [{ result: balance }, { result: name }, { result: symbol }] = item;
      return {
        balance: formatUnits(balance, 18),
        name,
        symbol,
      };
    });

    return balancesResult as BalanceOfTokenResult[];
  }, [result]);

  return {
    result,
    balances,
  };
};
