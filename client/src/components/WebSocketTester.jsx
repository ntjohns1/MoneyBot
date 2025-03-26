import React, { useState } from "react";
import { useSelector } from "react-redux";
import useWebSocket from "../features/useWebSocket";

const StockUpdates = () => {
  const { subscribe, unsubscribe } = useWebSocket("ws://localhost:8080/api/stream");
  const messages = useSelector((state) => state.websocket.messages);
  const [symbol, setSymbol] = useState("");

  return (
    <div>
      <h2>Stock WebSocket</h2>
      <input
        type="text"
        placeholder="Enter stock symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
      />
      <button
        onClick={() => {
          if (!symbol.trim()) {
            console.warn("⚠️ No symbol entered. Subscription aborted.");
            return;
          }
          console.log(`📤 Subscribing to: ${symbol}`);
          subscribe(symbol);
        }}
        disabled={!symbol.trim()} // Disable button when no symbol is entered
      >
        Subscribe
      </button>
      <button onClick={() => unsubscribe([symbol])}>Unsubscribe</button>
      <h3>Messages:</h3>
      <ul>
        {messages.slice(-10).map((msg, index) => (
          <li key={index}>{JSON.stringify(msg)}</li>
        ))}
      </ul>
    </div>
  );
};

export default StockUpdates;