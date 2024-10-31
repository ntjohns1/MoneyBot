import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import { LineChart } from "@mui/x-charts";
import dayjs from "dayjs";
import { fetchStockBars } from "../StocksSlice";


const StockHistoryChart = () => {
    const dispatch = useDispatch();
    const { bars, formState } = useSelector((state) => state.stocks);

    useEffect(() => {
        const { symbol, start, end, timeframe, timeframeUnit } = formState;
        dispatch(fetchStockBars({ symbol, start, end, timeframe, timeframeUnit }));
    }, [dispatch, formState]);

    const getDateFormatter = () => {
        switch (formState.timeframeUnit) {
            case "MIN":
                return (date) => dayjs(date).format("HH:mm");
            case "DAY":
                return (date) => dayjs(date).format("MM-DD");
            case "WEEK":
                return (date) => dayjs(date).format("HH:mm");
            case "MONTH":
                return (date) => dayjs(date).format("MMM YYYY");
            default:
                return (date) => dayjs(date).format("HH:mm");
        }
    };

    if (!bars || bars.length === 0) return <Box>No data available</Box>;

    const timestamps = bars.map((bar) => dayjs(bar.Timestamp).toDate());
    const closePrices = bars.map((bar) => bar.ClosePrice);
    const yAxisMin = Math.min(...closePrices) * 0.99;


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
                        data: closePrices,
                        label: "Close Price",
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

export default StockHistoryChart;