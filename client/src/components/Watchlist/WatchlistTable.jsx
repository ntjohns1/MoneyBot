import React, { useEffect } from "react";
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
import { styled } from '@mui/material/styles';

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

const dummyWatchlist = [
    { symbol: "AAPL", last_price: 175.12, change: 2.45, percent_change: 1.42, high_52w: 198.23, low_52w: 134.65, volume: 12034567 },
    { symbol: "TSLA", last_price: 812.36, change: -5.67, percent_change: -0.69, high_52w: 920.45, low_52w: 600.21, volume: 15478932 },
    { symbol: "AMZN", last_price: 3298.45, change: 15.32, percent_change: 0.47, high_52w: 3550.50, low_52w: 2876.34, volume: 8945634 },
    { symbol: "MSFT", last_price: 310.87, change: 1.23, percent_change: 0.40, high_52w: 349.67, low_52w: 275.12, volume: 6789456 },
    { symbol: "GOOGL", last_price: 2801.23, change: -12.45, percent_change: -0.44, high_52w: 2956.73, low_52w: 2501.42, volume: 4231789 },
];

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
    const { authState, oktaAuth } = useOktaAuth();
    // const dispatch = useDispatch();
    // const watchlist = useSelector((state) => state.watchlist.items);

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
                Watchlist
            </Typography>
            <StyledTableContainer component={Paper}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Symbol</StyledTableCell>
                            <StyledTableCell align="right">Last</StyledTableCell>
                            <StyledTableCell align="right">Change</StyledTableCell>
                            <StyledTableCell align="right">% Change</StyledTableCell>
                            <StyledTableCell align="right">52W High</StyledTableCell>
                            <StyledTableCell align="right">52W Low</StyledTableCell>
                            <StyledTableCell align="right">Volume</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dummyWatchlist.map((row) => (
                            <StyledTableRow key={row.symbol}>
                                <StyledTableCell component="th" scope="row">
                                    {row.symbol}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    ${formatNumber(row.last_price)}
                                </StyledTableCell>
                                <StyledTableCell 
                                    align="right"
                                    className={row.change >= 0 ? 'positive' : 'negative'}
                                >
                                    {row.change >= 0 ? '+' : ''}{formatNumber(row.change)}
                                </StyledTableCell>
                                <StyledTableCell 
                                    align="right"
                                    className={row.percent_change >= 0 ? 'positive' : 'negative'}
                                >
                                    {row.percent_change >= 0 ? '+' : ''}{formatNumber(row.percent_change)}%
                                </StyledTableCell>
                                <StyledTableCell align="right">${formatNumber(row.high_52w)}</StyledTableCell>
                                <StyledTableCell align="right">${formatNumber(row.low_52w)}</StyledTableCell>
                                <StyledTableCell align="right">{formatVolume(row.volume)}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>
        </Box>
    );
};

export default WatchlistTable;