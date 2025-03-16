import express from "express";
import { WebSocketServer } from "ws";
import { alpaca } from "../../client/index.js";

const router = express.Router();

// Set up WebSocket server and track connected clients
const wss = new WebSocketServer({ noServer: true });
const clients = new Set();

wss.on("connection", (ws) => {
  console.log("New WebSocket client connected");
  clients.add(ws);

  ws.on("close", () => {
    console.log("WebSocket client disconnected");
    clients.delete(ws);
  });
});

// Broadcast function to send data to all connected clients
const broadcast = (data) => {
  for (const client of clients) {
    if (client.readyState === 1) {
      client.send(JSON.stringify(data));
    }
  }
};

const socket = alpaca.data_stream_v2;

// Maintain a record of active subscriptions
const activeSubscriptions = new Set();

// Handle socket events
socket.onConnect(() => {
  console.log("Connected to Alpaca data stream");
});

socket.onError((err) => {
  console.error("Socket Error:", err);
});

socket.onStockTrade((trade) => {
  console.log("Trade:", trade);
  broadcast({ type: "trade", data: trade });
});

socket.onStockQuote((quote) => {
  console.log("Quote:", quote);
  broadcast({ type: "quote", data: quote });
});

socket.onStockBar((bar) => {
  console.log("Bar:", bar);
  broadcast({ type: "bar", data: bar });
});

socket.onDisconnect(() => {
  console.log("Disconnected from Alpaca data stream");
});

// Ensure the socket is connected
socket.connect();

/**
 * Subscribe to a stock symbol
 */
router.get("/subscribe/:symbol", (req, res) => {
  const { symbol } = req.params;

  if (activeSubscriptions.has(symbol)) {
    return res.status(400).json({ error: `Already subscribed to ${symbol}` });
  }

  activeSubscriptions.add(symbol);

  // Subscribe to all data streams for the given symbol
  socket.subscribeForTrades([symbol]);
  socket.subscribeForQuotes([symbol]);
  socket.subscribeForBars([symbol]);

  res.json({ message: `Subscribed to ${symbol}` });
});

/**
 * Unsubscribe from a stock symbol
 */
router.get("/unsubscribe/:symbol", (req, res) => {
  const { symbol } = req.params;

  if (!activeSubscriptions.has(symbol)) {
    return res.status(400).json({ error: `Not subscribed to ${symbol}` });
  }

  activeSubscriptions.delete(symbol);

  // Unsubscribe from all data streams for the given symbol
  socket.unsubscribeFromTrades([symbol]);
  socket.unsubscribeFromQuotes([symbol]);
  socket.unsubscribeFromBars([symbol]);

  res.json({ message: `Unsubscribed from ${symbol}` });
});

// Attach WebSocket upgrade handler
router.upgrade = (request, socket, head) => {
  console.log("Handling WebSocket upgrade request...");
  wss.handleUpgrade(request, socket, head, (ws) => {
    console.log("WebSocket upgrade successful.");
    wss.emit("connection", ws, request);
  });
};

export default router;
