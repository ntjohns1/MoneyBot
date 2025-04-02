import React, { useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useOktaAuth } from "@okta/okta-react";
import { setAccessToken } from "../../service/axiosConfig";
import { fetchAllWatchlists, fetchWatchlistById, setSelectedWatchlist, removeSymbol } from "./watchlistSlice";
import useWebSocket from "../../features/useWebSocket";
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const formatPrice = (price) => {
  return price ? `$${price.toFixed(2)}` : "-";
};

const formatVolume = (volume) => {
  if (!volume) return "-";
  return volume.toLocaleString();
};

const WatchlistTable = () => {
  const dispatch = useDispatch();
  const { authState, oktaAuth } = useOktaAuth();
  const { watchlists, selectedWatchlist, loading, error } = useSelector((state) => state.watchlist);
  const { data } = useSelector((state) => state.websocket);
  const { subscribe } = useWebSocket("ws://localhost:8080");

  const fetchWatchlistDetails = useCallback((id) => {
    dispatch(fetchWatchlistById(id));
  }, [dispatch]);

  // Debug logging for WebSocket data
  useEffect(() => {
    if (selectedWatchlist?.assets) {
      selectedWatchlist.assets.forEach(asset => {
        console.log(`[${asset.symbol}] WebSocket Data:`, data[asset.symbol] || 'No data');
      });
    }
  }, [selectedWatchlist?.assets, data]);

  // Subscribe to symbols
  useEffect(() => {
    if (selectedWatchlist?.assets) {
      selectedWatchlist.assets.forEach(asset => {
        subscribe(asset.symbol);
      });
    }
  }, [selectedWatchlist?.assets, subscribe]);

  // Process data for display
  const processedData = useMemo(() => {
    if (!selectedWatchlist?.assets) return [];
    
    return selectedWatchlist.assets.map(asset => {
      const symbolData = data[asset.symbol] || {};
      
      return {
        ...asset,
        price: symbolData.price || 0,
        volume: symbolData.bar?.volume || 0
      };
    });
  }, [selectedWatchlist?.assets, data]);

  // Fetch watchlists on mount and when auth changes
  useEffect(() => {
    if (authState?.isAuthenticated) {
      const getAccessToken = async () => {
        const token = await oktaAuth.getAccessToken();
        setAccessToken(token);
        dispatch(fetchAllWatchlists());
      };
      getAccessToken();
    }
  }, [authState, oktaAuth, dispatch]);

  // Select first watchlist by default
  useEffect(() => {
    if (watchlists?.length > 0 && !selectedWatchlist) {
      dispatch(setSelectedWatchlist(watchlists[0]));
      fetchWatchlistDetails(watchlists[0].id);
    }
  }, [watchlists, selectedWatchlist, dispatch, fetchWatchlistDetails]);

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
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!selectedWatchlist) {
    return <Alert severity="info">No watchlist selected</Alert>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Symbol</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Volume</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {processedData.map((row) => (
            <StyledTableRow key={row.symbol}>
              <StyledTableCell component="th" scope="row">
                {row.symbol}
              </StyledTableCell>
              <StyledTableCell align="right">
                {formatPrice(row.price)}
              </StyledTableCell>
              <StyledTableCell align="right">
                {formatVolume(row.volume)}
              </StyledTableCell>
              <StyledTableCell align="right">
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => handleRemoveSymbol(row.symbol)}
                >
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WatchlistTable;