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
import { fetchAllPositions } from "./positionsSlice";

const PositionsTable = () => {
    const { authState, oktaAuth } = useOktaAuth();
    const dispatch = useDispatch();
    const positions = useSelector((state) => state.positions.allPositions)

    useEffect(() => {
        if (authState.isAuthenticated) {
            const accessToken = oktaAuth.getAccessToken();
            setAccessToken(accessToken);
            dispatch(fetchAllPositions())
        }
    }, [dispatch])

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
                Positions
            </Typography>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="positions table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="right">Qty</TableCell>
                        <TableCell align="right">Mkt. Val</TableCell>
                        <TableCell align="right">Cost Basis</TableCell>
                        <TableCell align="right">Avg Price</TableCell>
                        <TableCell align="right">Current Price</TableCell>
                        <TableCell align="right">Last Day Price</TableCell>
                        <TableCell align="right">Profit/Loss</TableCell>
                        <TableCell align="right">Profit/Loss Pct</TableCell>
                        <TableCell align="right">Pct Change</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {positions.map((pos) => (
                        <TableRow
                            key={pos.asset_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="pos">
                                {pos.symbol}
                            </TableCell>
                            <TableCell align="right">{pos.qty_available}</TableCell>
                            <TableCell align="right">{pos.market_value}</TableCell>
                            <TableCell align="right">{pos.cost_basis}</TableCell>
                            <TableCell align="right">{pos.avg_entry_price}</TableCell>
                            <TableCell align="right">{pos.current_price}</TableCell>
                            <TableCell align="right">{pos.lastday_price}</TableCell>
                            <TableCell align="right">{pos.unrealized_pl}</TableCell>
                            <TableCell align="right">{pos.unrealized_plpc}</TableCell>
                            <TableCell align="right">{pos.change_today}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PositionsTable;