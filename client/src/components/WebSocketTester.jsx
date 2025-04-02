import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useWebSocket from '../features/useWebSocket';
import { Box, Paper, Typography } from '@mui/material';

const WebSocketTester = () => {
  const { subscribe } = useWebSocket('ws://localhost:8080');
  const { connected, data } = useSelector((state) => state.websocket);

  // Subscribe to test symbols
  useEffect(() => {
    console.log("🔄 Setting up test subscriptions");
    const testSymbols = ['AAPL', 'NVDA'];
    
    // Small delay to ensure WebSocket is initialized
    const timer = setTimeout(() => {
      testSymbols.forEach(symbol => {
        console.log(`🔔 Testing subscription for ${symbol}`);
        subscribe(symbol);
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [subscribe]);

  return (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">WebSocket Test</Typography>
        <Typography>Status: {connected ? '🟢 Connected' : '🔴 Disconnected'}</Typography>
        <Typography sx={{ mt: 2 }}>Data:</Typography>
        <pre style={{ maxHeight: '400px', overflow: 'auto' }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      </Paper>
    </Box>
  );
};

export default WebSocketTester;