import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useOktaAuth } from "@okta/okta-react";
import { setAccessToken } from "../../service/axiosConfig";
import Box from "@mui/material/Box";
import { LineChart } from "@mui/x-charts";
import { fetchPortfolioHistory } from "./accountSlice";
import dayjs from "dayjs";
import { lastValidDate } from "../../util/dayjsHelper";
import TimeframeButtons from "./TimeframeButtons";

const HistoryChart = () => {
    const { authState, oktaAuth } = useOktaAuth();
    const dispatch = useDispatch();
    const portfolioHistory = useSelector((state) => state.account.portfolioHistory);
    const timestamps = portfolioHistory.timestamps.map((ts) => dayjs.unix(ts).toDate());
    const equity = portfolioHistory.equity;
    const isMinute = useSelector((state) => state.account.portfolioHistory.isMinute);

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
            dispatch(fetchPortfolioHistory({ date_start: undefined, date_end: end, period: "1D", timeframe: "1Min" }));
        }
    }, [authState, oktaAuth, dispatch]);

    useEffect(() => {
        if (portfolioHistory && portfolioHistory.length > 0) {
            console.log(portfolioHistory);


        }
    }, [portfolioHistory]);

    const getDateFormatter = () => {

        return (date) => {
            if (isMinute) {
                return dayjs(date).format("HH:mm"); // Minute-level formatting
            } else {
                return dayjs(date).format("MM-DD"); // Day-level formatting
            }
        };
    };
    const loading = useSelector((state) => state.account.loading);
    const error = useSelector((state) => state.account.error);

    if (loading) return <Box>Loading...</Box>;
    if (error) return <Box>Error loading data: {error.message}</Box>;
    if (!portfolioHistory || portfolioHistory.length === 0) return <Box>No data available</Box>;

    return (
        <Box>
            <TimeframeButtons />
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
                        label: 'Dollars',
                        labelFontSize: 16, // Adjust font size for the label
                        // labelStyle: { marginRight: }, // Adds space between the label and axis
                        // tickSize: 10, // Adjust the tick size
                        tickLabelStyle: { fontSize: 12, marginRight: 10 }, // Style the tick labels
                        position: 'left', // Ensure proper positioning
                    },
                ]}
                series={[
                    {
                        data: equity,
                        label: "Total Equity",
                        curve: "linear",
                        color: "#F64740",
                        area: false,
                        showMark: false,
                    },
                ]}
                margin={{ right: 30, top: 30, bottom: 30 }}
                width={1500}
                height={900}
            />
        </Box>
    );
};

export default HistoryChart;