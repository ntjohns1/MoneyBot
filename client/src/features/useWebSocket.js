import { useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setConnected, updateData } from "./webSocketSlice";

const useWebSocket = (url) => {
  const dispatch = useDispatch();
  const socketRef = useRef(null);
  const pendingSubscriptionsRef = useRef([]);

  const connect = useCallback(() => {
    if (socketRef.current?.readyState === 1) return;

    console.log("🔌 Connecting to WebSocket:", url);
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
      dispatch(setConnected(true));
      
      // Process any pending subscriptions
      if (pendingSubscriptionsRef.current.length > 0) {
        console.log("📤 Processing pending subscriptions:", pendingSubscriptionsRef.current);
        const message = {
          action: "subscribe",
          quotes: pendingSubscriptionsRef.current,
          trades: pendingSubscriptionsRef.current,
          bars: pendingSubscriptionsRef.current
        };
        socket.send(JSON.stringify(message));
        pendingSubscriptionsRef.current = [];
      }
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("📨 Received:", data);
        dispatch(updateData({ type: data.type, data: data.data }));
      } catch (error) {
        console.error("❌ Error processing message:", error);
      }
    };

    socket.onclose = () => {
      console.log("❌ WebSocket disconnected");
      dispatch(setConnected(false));
    };

    socket.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
    };
  }, [url, dispatch]);

  useEffect(() => {
    connect();
    return () => {
      if (socketRef.current) {
        console.log("🔌 Closing WebSocket connection");
        socketRef.current.close();
      }
    };
  }, [connect]);

  const subscribe = useCallback((symbol) => {
    if (!symbol) return;

    console.log("📝 Processing subscription request for:", symbol);
    
    if (socketRef.current?.readyState === 1) {
      const message = {
        action: "subscribe",
        quotes: [symbol],
        trades: [symbol],
        bars: [symbol]
      };
      console.log("📤 Sending subscription:", message);
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.log("⏳ WebSocket not ready, queueing subscription for:", symbol);
      if (!pendingSubscriptionsRef.current.includes(symbol)) {
        pendingSubscriptionsRef.current.push(symbol);
      }
    }
  }, []);

  return { subscribe };
};

export default useWebSocket;