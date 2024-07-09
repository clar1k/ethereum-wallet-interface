import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useReadBalanceTokens } from "@/hooks";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";
import { Fragment } from "react/jsx-runtime";

export function Home() {
  const { result, tokensData } = useReadBalanceTokens();
  const { isConnected } = useAccount();

  return (
    <section className="flex flex-col gap-5">
      <nav className="mt-5 ml-5">
        <ConnectButton chainStatus="icon" />
      </nav>
      {isConnected && (
        <>
          <p className="text-3xl ml-5 mr-5 flex flex-grow justify-center items-center bg-black text-white rounded-xl py-2">
            Your balances
          </p>
          <main className="grid grid-rows-3 grid-cols-3 gap-1 ml-5 mr-5">
            {result.isFetching
              ? ""
              : tokensData.map((token) => (
                  <Fragment key={token.symbol}>
                    <div className="text-2xl bg-black text-white border-y-2 rounded-xl p-2">
                      {token.symbol}
                    </div>
                    <div className="text-xl bg-black text-white border-y-2 rounded-xl p-2">
                      {token.name}
                    </div>
                    <div className="text-2xl bg-black text-white border-y-2 rounded-xl p-2">
                      {token.balance}
                    </div>
                  </Fragment>
                ))}
          </main>
        </>
      )}
    </section>
  );
}
