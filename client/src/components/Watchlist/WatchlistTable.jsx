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
// import { fetchWatchlist } from "./watchlistSlice";  // Redux action to fetch watchlist data

const dummyWatchlist = [
    { symbol: "AAPL", last_price: 175.12, change: 2.45, percent_change: 1.42, high_52w: 198.23, low_52w: 134.65, volume: 12034567 },
    { symbol: "TSLA", last_price: 812.36, change: -5.67, percent_change: -0.69, high_52w: 920.45, low_52w: 600.21, volume: 15478932 },
    { symbol: "AMZN", last_price: 3298.45, change: 15.32, percent_change: 0.47, high_52w: 3550.50, low_52w: 2876.34, volume: 8945634 },
    { symbol: "MSFT", last_price: 310.87, change: 1.23, percent_change: 0.40, high_52w: 349.67, low_52w: 275.12, volume: 6789456 },
    { symbol: "GOOGL", last_price: 2801.23, change: -12.45, percent_change: -0.44, high_52w: 2956.73, low_52w: 2501.42, volume: 4231789 },
];

const WatchlistTable = () => {
    const { authState, oktaAuth } = useOktaAuth();
    // const dispatch = useDispatch();
    // const watchlist = useSelector((state) => state.watchlist.items);  // Fetching watchlist from Redux

    // useEffect(() => {
    //     if (authState.isAuthenticated) {
    //         const accessToken = oktaAuth.getAccessToken();
    //         setAccessToken(accessToken);
    //         dispatch(fetchWatchlist());  // Dispatch action to fetch watchlist
    //     }
    // }, [dispatch]);

    return (
        <TableContainer component={Paper}>
            <Typography
                variant="h6"
                sx={{
                    display: 'flex',
                    justifyContent: 'left',
                    alignItems: 'center',
                    pt: { xs: 1 },
                    pb: { xs: 1 },
                    mt: { xs: 1 },
                    mb: { xs: 1 },
                    ml: { xs: 2 }
                }}
            >
                Watchlist
            </Typography>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="watchlist table">
                <TableHead>
                    <TableRow>
                        <TableCell>Symbol</TableCell>
                        <TableCell align="right">Last Price</TableCell>
                        <TableCell align="right">Change</TableCell>
                        <TableCell align="right">% Change</TableCell>
                        <TableCell align="right">52W High</TableCell>
                        <TableCell align="right">52W Low</TableCell>
                        <TableCell align="right">Volume</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dummyWatchlist.map((stock) => (
                        <TableRow
                            key={stock.symbol}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {stock.symbol}
                            </TableCell>
                            <TableCell align="right">{stock.last_price}</TableCell>
                            <TableCell align="right">{stock.change}</TableCell>
                            <TableCell align="right">{stock.percent_change}</TableCell>
                            <TableCell align="right">{stock.high_52w}</TableCell>
                            <TableCell align="right">{stock.low_52w}</TableCell>
                            <TableCell align="right">{stock.volume}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default WatchlistTable;