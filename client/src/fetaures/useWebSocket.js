import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, setConnected, updateSubscriptions } from "./webSocketSlice";

const useWebSocket = (url) => {
  const dispatch = useDispatch();
  const subscribedSymbols = useSelector((state) => state.websocket.subscribedSymbols);
  let socket = null;

  useEffect(() => {
    socket = new WebSocket(url);

    socket.onopen = () => {
      dispatch(setConnected(true));
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      dispatch(addMessage(data));
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      dispatch(setConnected(false));
      console.log("WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, [url, dispatch]);

  const subscribe = (symbols) => {
    if (socket && socket.readyState === 1) {
      socket.send(JSON.stringify({ action: "subscribe", symbols }));
      dispatch(updateSubscriptions([...new Set([...subscribedSymbols, ...symbols])]));
    }
  };

  const unsubscribe = (symbols) => {
    if (socket && socket.readyState === 1) {
      socket.send(JSON.stringify({ action: "unsubscribe", symbols }));
      dispatch(updateSubscriptions(subscribedSymbols.filter((s) => !symbols.includes(s))));
    }
  };

  return { subscribe, unsubscribe };
};

export default useWebSocket;