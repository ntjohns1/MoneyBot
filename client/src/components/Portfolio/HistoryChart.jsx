import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useOktaAuth } from "@okta/okta-react";
import { setAccessToken } from "../../service/axiosConfig";
import Box from "@mui/material/Box";
import { fetchPortfolioHistory } from "./accountSlice";
import dayjs from "dayjs";
import { lastValidDate } from "../../util/dayjsHelper";
import TimeframeButtons from "./TimeframeButtons";
import Chart from "react-apexcharts";

const HistoryChart = () => {
    const { authState, oktaAuth } = useOktaAuth();
    const dispatch = useDispatch();
    const portfolioHistory = useSelector((state) => state.account.portfolioHistory);
    const timestamps = portfolioHistory.timestamps.map((ts) => dayjs.unix(ts).toDate());
    const equity = portfolioHistory.equity;
    const isMinute = useSelector((state) => state.account.portfolioHistory.isMinute);

    const [yAxisMin, setYAxisMin] = useState(0);
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

    const formattedData = timestamps.map((time, index) => [time.getTime(), equity[index]]);

    const options = {
        chart: {
            type: "line",
            height: '100%',
            width: '100%',
            zoom: {
                type: "y",
                enabled: true,
                autoScaleYaxis: true,
            },
            toolbar: {
                autoSelected: "zoom",
            },
        },
        title: {
            text: "Portfolio History",
            align: "left",
        },
        xaxis: {
            type: "datetime",
        },
        yaxis: {
            min: yAxisMin,
            title: {
                text: "Equity ($)",
            },
        },
        tooltip: {
            x: {
                format: isMinute ? "HH:mm" : "MM-dd",
            },
        },
    };

    const series = [
        {
            name: "Equity",
            data: formattedData,
        },
    ];

    const loading = useSelector((state) => state.account.loading);
    const error = useSelector((state) => state.account.error);

    if (loading) return <Box>Loading...</Box>;
    if (error) return <Box>Error loading data: {error.message}</Box>;
    if (!portfolioHistory || portfolioHistory.timestamps.length === 0) return <Box>No data available</Box>;

    return (
        <Box>
            <TimeframeButtons />
            <Chart options={options} series={series} type="line" height={400} width={800} />
        </Box>
    );
};

export default HistoryChart;