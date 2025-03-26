import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, setConnected, updateSubscriptions } from "./webSocketSlice";

const useWebSocket = (url) => {
  const dispatch = useDispatch();
  const subscribedSymbols = useSelector((state) => state.websocket.subscribedSymbols);
  const socketRef = useRef(null); // Use useRef to persist WebSocket instance

  useEffect(() => {
    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      dispatch(setConnected(true));
      console.log("✅ WebSocket connected");
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📨 Received message:", data);
      dispatch(addMessage(data));
    };

    socketRef.current.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
    };

    socketRef.current.onclose = () => {
      dispatch(setConnected(false));
      console.log("❌ WebSocket disconnected");
    };

    return () => {
      socketRef.current.close();
    };
  }, [url, dispatch]);

  const subscribe = (symbol) => {
    console.log("🟢 subscribe() function called with symbol:", symbol);

    if (!socketRef.current) {
      console.error("❌ WebSocket instance is null.");
      return;
    }

    if (socketRef.current.readyState !== 1) {
      console.error("❌ WebSocket is not open. Current state:", socketRef.current.readyState);
      return;
    }

    const message = JSON.stringify({ action: "subscribe", symbol }); // Send single symbol
    console.log("📤 Sending subscription message:", message);
    socketRef.current.send(message);
    dispatch(updateSubscriptions([...new Set([...subscribedSymbols, symbol])]));
  };

  return { subscribe };
};

export default useWebSocket;