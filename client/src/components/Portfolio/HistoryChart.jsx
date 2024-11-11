import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useOktaAuth } from "@okta/okta-react";
import { setAccessToken } from "../../service/axiosConfig";
import Box from "@mui/material/Box";
import { LineChart } from "@mui/x-charts";
import { fetchPortfolioHistory } from "./accountSlice";
import dayjs from "dayjs";
import { lastValidDate } from "../../util/dayjsHelper";

const HistoryChart = () => {
    const { authState, oktaAuth } = useOktaAuth();
    const dispatch = useDispatch();
    const portfolioHistory = useSelector((state) => state.account.portfolioHistory);
    const timestamps = portfolioHistory.timestamps.map((ts) => dayjs.unix(ts).toDate());
    const equity = portfolioHistory.equity;
    
    useEffect(() => {
        if (equity && equity.length > 0) {
            setYAxisMin(Math.min(...equity) * 0.99);
        }
    }, [equity]);
    const [yAxisMin, setYAxisMin] = useState(0);
    const start = lastValidDate().subtract(12, "month").format("YYYY-MM-DD");
    const end = dayjs(lastValidDate()).format("YYYY-MM-DD");



useEffect(() => {
    if (equity && equity.length > 0) {
        setYAxisMin(Math.min(...equity) * 0.99);
    }
}, [equity]);

    useEffect(() => {
        if (authState.isAuthenticated) {
            const accessToken = oktaAuth.getAccessToken();
            setAccessToken(accessToken);
            dispatch(fetchPortfolioHistory({ date_start: undefined, date_end: end, period: "1A", timeframe: "1D" }));            
        }
    }, [authState, oktaAuth, dispatch]);

    useEffect(() => {
        if (portfolioHistory && portfolioHistory.length > 0) {
            console.log(portfolioHistory);
            

        }
    }, [portfolioHistory]);

    const getDateFormatter = () => (date) => dayjs(date).format("MM/DD/YYYY");

    const loading = useSelector((state) => state.account.loading);
    const error = useSelector((state) => state.account.error);

    if (loading) return <Box>Loading...</Box>;
    if (error) return <Box>Error loading data: {error.message}</Box>;
    if (!portfolioHistory || portfolioHistory.length === 0) return <Box>No data available</Box>;

    return (
        <Box>
            <LineChart
                xAxis={[
                    {
                        data: timestamps,
                        scaleType: 'time',
                        valueFormatter: getDateFormatter(),
                        label: 'Time',
                    },
                ]}
                yAxis={[
                    {
                        min: yAxisMin,
                        label: 'Price',
                    },
                ]}
                series={[
                    {
                        data: equity,
                        label: "Investing",
                        curve: "linear",
                        color: "#F64740",
                        area: false,
                        showMark: false,
                    },
                ]}
                width={1000}
                height={600}
            />
        </Box>
    );
};

export default HistoryChart;