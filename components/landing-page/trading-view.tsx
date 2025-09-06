"use client";

import { useEffect, useRef } from "react";

export default function TradingViewMarketList() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current && !container.current.querySelector("script")) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        width: "100%",
        height: 500,
        symbolsGroups: [
          {
            name: "Crypto",
            originalName: "Crypto",
            symbols: [
              { name: "BINANCE:BTCUSDT", displayName: "Bitcoin" },
              { name: "BINANCE:ETHUSDT", displayName: "Ethereum" },
              { name: "BINANCE:SOLUSDT", displayName: "Solana" },
              { name: "BINANCE:DOGEUSDT", displayName: "Dogecoin" },
              { name: "BINANCE:MATICUSDT", displayName: "Polygon" },
            ],
          },
          {
            name: "Forex",
            originalName: "Forex",
            symbols: [
              { name: "FX:EURUSD", displayName: "EUR/USD" },
              { name: "FX:GBPUSD", displayName: "GBP/USD" },
              { name: "FX:USDJPY", displayName: "USD/JPY" },
            ],
          },
        ],
        showSymbolLogo: true,
        colorTheme: "dark",
        isTransparent: true,
        locale: "en",
      });
      container.current.appendChild(script);
    }
  }, []);

  return (
    <section className="py-20 bg-slate-900/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 text-center">
          Market Overview
        </h2>
        <div
          className="tradingview-widget-container"
          ref={container}
          data-theme="dark"
        >
          <div className="tradingview-widget-container__widget" />
        </div>
      </div>
    </section>
  );
}
