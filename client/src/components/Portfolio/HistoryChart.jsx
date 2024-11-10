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
    const portfolioHistory = useSelector((state) => state.account.portfolioHistory);
    const dispatch = useDispatch();
    const [timestamps, setTimestamps] = useState([]);
    const [equity, setEquity] = useState([]);
    const [yAxisMin, setYAxisMin] = useState(0);

    useEffect(() => {
        if (authState.isAuthenticated) {
            const accessToken = oktaAuth.getAccessToken();
            setAccessToken(accessToken);
            dispatch(fetchPortfolioHistory("", lastValidDate(), "1A", "1D"));
        }
    }, [authState, oktaAuth, dispatch]);

    useEffect(() => {
        if (portfolioHistory && portfolioHistory.length > 0) {
            const newTimestamps = portfolioHistory.map((bar) => dayjs(bar.Timestamp).toDate());
            const newEquity = portfolioHistory.map((val) => val.equity);
            setTimestamps(newTimestamps);
            setEquity(newEquity);
            setYAxisMin(Math.min(...newEquity) * 0.99);
        }
    }, [portfolioHistory]);

    const getDateFormatter = () => (date) => dayjs(date).format("MM/DD/YYYY");

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