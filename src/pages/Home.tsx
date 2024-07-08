import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useReadBalanceTokens } from "@/hooks";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";

export function Home() {
  const { results } = useReadBalanceTokens();
  const { isConnected } = useAccount();

  console.log(results);
  return (
    <section className="flex flex-col gap-5">
      <nav className="mt-5 ml-5">
        <ConnectButton chainStatus="icon" />
      </nav>
      {isConnected && (
        <main className="flex flex-col gap-2 ml-5">
          <p className="text-3xl">Your balances</p>
          {results.isFetching
            ? "Fetching results data"
            : results.data?.map((balance) => (
                <p>{formatUnits(balance.result as bigint, 18)}</p>
              ))}
        </main>
      )}
    </section>
  );
}
