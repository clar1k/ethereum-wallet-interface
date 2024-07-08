import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useReadBalanceTokens } from "@/hooks";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";
import { Fragment } from "react/jsx-runtime";

export function Home() {
  const { result, balances } = useReadBalanceTokens();
  const { isConnected } = useAccount();

  return (
    <section className="flex flex-col gap-5">
      <nav className="mt-5 ml-5">
        <ConnectButton chainStatus="icon" />
      </nav>
      {isConnected && (
        <>
          <p className="text-3xl ml-5">Your balances</p>
          <main className="grid grid-rows-3 grid-cols-3 gap-1 ml-5">
            {result.isFetching
              ? ""
              : balances.map((item) => {
                  return (
                    <Fragment key={item.symbol}>
                      <div>{item.symbol}</div>
                      <div>{item.name}</div>
                      <div>{item.balance}</div>
                    </Fragment>
                  );
                })}
          </main>
        </>
      )}
    </section>
  );
}
