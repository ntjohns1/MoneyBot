import express from "express";
import { WebSocketServer } from "ws";
import { alpaca } from "../../client/index.js";

const router = express.Router();
const wss = new WebSocketServer({ noServer: true });
const clients = new Set();
const clientSubscriptions = new Map(); // Maps clients to their subscribed symbols

const socket = alpaca.data_stream_v2;
const activeSubscriptions = new Set();

// Handle WebSocket connections
wss.on("connection", (ws) => {
  console.log("New WebSocket client connected");
  clients.add(ws);
  clientSubscriptions.set(ws, new Set());

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);
      console.log("Received message from WebSocket client:", data);
      
      const { action, symbol } = data;
      if (action === "subscribe" && symbol) {
        clientSubscriptions.get(ws).add(symbol);
        if (!activeSubscriptions.has(symbol)) {
          activeSubscriptions.add(symbol);
          console.log(`🟢 Subscribing to ${symbol} on Alpaca`);
          socket.subscribeForTrades([symbol]);
          socket.subscribeForQuotes([symbol]);
          socket.subscribeForBars([symbol]);
        }
      } else if (action === "unsubscribe" && symbol) {
        clientSubscriptions.get(ws).delete(symbol);
        if (![...clientSubscriptions.values()].some((set) => set.has(symbol))) {
          activeSubscriptions.delete(symbol);
          console.log(`🔴 Unsubscribing from ${symbol} on Alpaca`);
          socket.unsubscribeFromTrades([symbol]);
          socket.unsubscribeFromQuotes([symbol]);
          socket.unsubscribeFromBars([symbol]);
        }
      }
    } catch (err) {
      console.error("❌ Invalid message from WebSocket client:", err);
    }
  });

  ws.on("close", () => {
    console.log("WebSocket client disconnected");
    clients.delete(ws);
    clientSubscriptions.delete(ws);
  });
});

// Handle Alpaca WebSocket events
socket.onConnect(() => {
  console.log("Connected to Alpaca data stream");
});

socket.onStockTrade((trade) => {
  // console.log("Trade:", trade);
  broadcast({ type: "trade", data: trade });
});

socket.onStockQuote((quote) => {
  // console.log("Quote:", quote);
  broadcast({ type: "quote", data: quote });
});

socket.onStockBar((bar) => {
  // console.log("Bar:", bar);
  broadcast({ type: "bar", data: bar });
});

socket.onDisconnect(() => {
  console.log("Disconnected from Alpaca data stream");
});

socket.connect();

// Filtered Broadcast function (based on symbols)
const broadcast = (data) => {
  for (const client of clients) {
    if (client.readyState === 1) {
      const symbols = clientSubscriptions.get(client) || new Set();
      if (symbols.has(data.data.S)) {
        client.send(JSON.stringify(data));
      }
    }
  }
};

// WebSocket Upgrade Handling
router.upgrade = (request, socket, head) => {
  console.log("Handling WebSocket upgrade request...");
  wss.handleUpgrade(request, socket, head, (ws) => {
    console.log("WebSocket upgrade successful.");
    wss.emit("connection", ws, request);
  });
};

export default router;