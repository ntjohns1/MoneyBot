import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: 'calc(100vh - 200px)',
  backgroundColor: '#1a1a1a',
}));

const StyledTable = styled(Table)({
  '& .MuiTableCell-root': {
    color: '#ffffff',
    borderColor: '#333333',
  },
});

const StyledTableHeaderCell = styled(TableCell)({
  backgroundColor: '#262626',
  fontWeight: 'bold',
  position: 'sticky',
  top: 0,
  zIndex: 1,
});

const formatNumber = (value) => {
  if (typeof value !== 'number') return '--';
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatChange = (value) => {
  if (typeof value !== 'number') return '--';
  const formatted = formatNumber(Math.abs(value));
  const color = value > 0 ? '#4caf50' : value < 0 ? '#f44336' : 'inherit';
  return <span style={{ color }}>{value > 0 ? '+' : '-'}{formatted}%</span>;
};

const WatchlistTable = () => {
  const { selectedWatchlist, loading } = useSelector((state) => state.watchlist);

  // Dummy data generator
  const getDummyData = (symbol) => ({
    price: Math.random() * 1000,
    change: (Math.random() * 10) - 5, // -5 to +5
    volume: Math.floor(Math.random() * 1000000),
    bid: Math.random() * 1000,
    ask: Math.random() * 1000,
    high: Math.random() * 1000,
    low: Math.random() * 1000,
  });

  if (loading) {
    return (
      <StyledTableContainer component={Paper}>
        <div style={{ padding: 16, color: '#ffffff', textAlign: 'center' }}>
          <CircularProgress />
        </div>
      </StyledTableContainer>
    );
  }

  if (!selectedWatchlist?.assets?.length) {
    return (
      <StyledTableContainer component={Paper}>
        <div style={{ padding: 16, color: '#ffffff', textAlign: 'center' }}>
          {selectedWatchlist ? 'No symbols in this watchlist' : 'Please select a watchlist'}
        </div>
      </StyledTableContainer>
    );
  }

  return (
    <StyledTableContainer component={Paper}>
      <StyledTable stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableHeaderCell>Symbol</StyledTableHeaderCell>
            <StyledTableHeaderCell align="right">Price</StyledTableHeaderCell>
            <StyledTableHeaderCell align="right">Change</StyledTableHeaderCell>
            <StyledTableHeaderCell align="right">Volume</StyledTableHeaderCell>
            <StyledTableHeaderCell align="right">Bid</StyledTableHeaderCell>
            <StyledTableHeaderCell align="right">Ask</StyledTableHeaderCell>
            <StyledTableHeaderCell align="right">High</StyledTableHeaderCell>
            <StyledTableHeaderCell align="right">Low</StyledTableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedWatchlist.assets.map((asset) => {
            const data = getDummyData(asset.symbol);
            return (
              <TableRow key={asset.id} hover>
                <TableCell>{asset.symbol}</TableCell>
                <TableCell align="right">{formatNumber(data.price)}</TableCell>
                <TableCell align="right">{formatChange(data.change)}</TableCell>
                <TableCell align="right">{formatNumber(data.volume)}</TableCell>
                <TableCell align="right">{formatNumber(data.bid)}</TableCell>
                <TableCell align="right">{formatNumber(data.ask)}</TableCell>
                <TableCell align="right">{formatNumber(data.high)}</TableCell>
                <TableCell align="right">{formatNumber(data.low)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

export default WatchlistTable;