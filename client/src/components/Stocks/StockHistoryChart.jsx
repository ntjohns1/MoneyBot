import React from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { LineChart, ChartContainer } from "@mui/x-charts";
import dayjs from "dayjs";

const StockHistoryChart = () => {
    const bars = useSelector((state) => state.stocks.bars);

    if (!bars || bars.length === 0) {
        console.warn("No data available for chart.");
        return <Box>No data available</Box>;
    }

    // Convert timestamps to JavaScript Date objects
    const timestamps = bars
        .map((bar) => {
            const date = dayjs(bar.Timestamp).toDate();
            return date instanceof Date && !isNaN(date) ? date : null;
        })
        .filter((timestamp) => timestamp !== null);

    const closePrices = bars
        .map((bar) => (typeof bar.ClosePrice === "number" ? bar.ClosePrice : null))
        .filter((price) => price !== null);

    if (timestamps.length !== closePrices.length) {
        console.error("Mismatch between timestamps and prices data length.");
        return <Box>Data error: mismatched timestamps and prices</Box>;
    }

    const minClosePrice = Math.min(...closePrices);
    const yAxisMin = minClosePrice * 0.99;

    return (
        <Box>
            <LineChart
                xAxis={[
                    {
                        data: timestamps,
                        scaleType: 'time',
                        valueFormatter: (date) => dayjs(date).format('HH:mm'),
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
                        color: "#1976d2",
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