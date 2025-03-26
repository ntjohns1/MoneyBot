import React, { useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useOktaAuth } from "@okta/okta-react";
import { setAccessToken } from "../../service/axiosConfig";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import {
  fetchAllWatchlists,
  removeSymbol,
  setSelectedWatchlist,
  fetchWatchlistById,
} from "./watchlistSlice";
import useWebSocket from "../../features/useWebSocket";

// Styled components
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: '#1a1a1a',
  color: '#ffffff',
  maxHeight: '100vh',
  '& .MuiTableCell-root': {
    color: '#ffffff',
    borderColor: '#333333',
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: '8px 16px',
  fontSize: '0.875rem',
  '&.positive': {
    color: '#4caf50',
  },
  '&.negative': {
    color: '#f44336',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#2a2a2a',
    cursor: 'pointer',
  },
}));

const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

const formatVolume = (volume) => {
  if (volume >= 1000000) {
    return `${(volume / 1000000).toFixed(2)}M`;
  } else if (volume >= 1000) {
    return `${(volume / 1000).toFixed(2)}K`;
  }
  return volume.toString();
};

const WatchlistTable = () => {
  const dispatch = useDispatch();
  const { authState, oktaAuth } = useOktaAuth();
  const { watchlists, selectedWatchlist, loading, error } = useSelector((state) => state.watchlist);
  const { priceData, subscribedSymbols } = useSelector((state) => state.websocket);
  const { subscribe } = useWebSocket("ws://localhost:8080");

  const fetchWatchlistDetails = useCallback((id) => {
    dispatch(fetchWatchlistById(id));
  }, [dispatch]);

  // Memoize the current symbols to prevent unnecessary resubscriptions
  const currentSymbols = useMemo(() => {
    return selectedWatchlist?.assets?.map(asset => asset.symbol) || [];
  }, [selectedWatchlist?.assets]);

  // Fetch watchlists on mount and when auth changes
  useEffect(() => {
    if (authState?.isAuthenticated) {
      const accessToken = oktaAuth.getAccessToken();
      setAccessToken(accessToken);
      dispatch(fetchAllWatchlists());
    }
  }, [dispatch, authState?.isAuthenticated, oktaAuth]);

  // Select first watchlist if none selected
  useEffect(() => {
    if (!selectedWatchlist && watchlists.length > 0) {
      const firstWatchlist = watchlists[0];
      dispatch(setSelectedWatchlist(firstWatchlist));
      fetchWatchlistDetails(firstWatchlist.id);
    }
  }, [watchlists, selectedWatchlist, dispatch, fetchWatchlistDetails]);

  // Subscribe to symbols in the selected watchlist
  useEffect(() => {
    if (selectedWatchlist?.id && !selectedWatchlist?.assets) {
      fetchWatchlistDetails(selectedWatchlist.id);
    }
    
    if (selectedWatchlist?.assets) {
      // Only subscribe to symbols that aren't already subscribed
      currentSymbols.forEach(symbol => {
        if (!subscribedSymbols.includes(symbol)) {
          subscribe(symbol);
        }
      });
    }
  }, [selectedWatchlist?.id, currentSymbols, subscribedSymbols, subscribe, fetchWatchlistDetails]);

  // Refresh watchlist data periodically
  useEffect(() => {
    if (selectedWatchlist?.id) {
      const interval = setInterval(() => {
        dispatch(fetchWatchlistById(selectedWatchlist.id));
      }, 30000); // Refresh every 30 seconds

      return () => clearInterval(interval);
    }
  }, [selectedWatchlist?.id, dispatch]);

  // Format the price data for display
  const getDisplayData = (symbol) => {
    const data = priceData[symbol] || {
      price: 0,
      change: 0,
      changePercent: 0,
      volume: 0,
      highPrice: 0,
      lowPrice: 0,
    };

    return {
      price: data.price,
      change: data.change,
      changePercent: data.changePercent,
      volume: data.volume,
      highPrice: data.highPrice,
      lowPrice: data.lowPrice,
    };
  };

  const handleRemoveSymbol = async (symbol) => {
    if (selectedWatchlist) {
      try {
        await dispatch(removeSymbol({ id: selectedWatchlist.id, symbol })).unwrap();
        // Refresh the watchlist after removing symbol
        dispatch(fetchWatchlistById(selectedWatchlist.id));
      } catch (error) {
        console.error('Failed to remove symbol:', error);
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!selectedWatchlist) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="info">No watchlist selected</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', bgcolor: '#1a1a1a', p: 2 }}>
      <Typography
        variant="h6"
        sx={{
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'center',
          pb: 2,
        }}
      >
        {selectedWatchlist?.name}
      </Typography>

      <StyledTableContainer component={Paper}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>Symbol</StyledTableCell>
              <StyledTableCell align="right">Last</StyledTableCell>
              <StyledTableCell align="right">Change</StyledTableCell>
              <StyledTableCell align="right">% Change</StyledTableCell>
              <StyledTableCell align="right">High</StyledTableCell>
              <StyledTableCell align="right">Low</StyledTableCell>
              <StyledTableCell align="right">Volume</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedWatchlist?.assets?.map((asset) => {
              const data = getDisplayData(asset.symbol);
              return (
                <StyledTableRow key={asset.symbol}>
                  <StyledTableCell component="th" scope="row">
                    {asset.symbol}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    ${formatNumber(data.price)}
                  </StyledTableCell>
                  <StyledTableCell 
                    align="right"
                    className={data.change >= 0 ? 'positive' : 'negative'}
                  >
                    {data.change >= 0 ? '+' : ''}{formatNumber(data.change)}
                  </StyledTableCell>
                  <StyledTableCell 
                    align="right"
                    className={data.changePercent >= 0 ? 'positive' : 'negative'}
                  >
                    {data.changePercent >= 0 ? '+' : ''}{formatNumber(data.changePercent)}%
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    ${formatNumber(data.highPrice)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    ${formatNumber(data.lowPrice)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {formatVolume(data.volume)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveSymbol(asset.symbol)}
                      sx={{ color: '#f44336' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Box>
  );
};

export default WatchlistTable;