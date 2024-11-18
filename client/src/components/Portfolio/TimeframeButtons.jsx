import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useOktaAuth } from "@okta/okta-react";
import { setAccessToken } from "../../service/axiosConfig";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import dayjs from "dayjs";
import { lastValidDate } from "../../util/dayjsHelper";
import { fetchPortfolioHistory } from "./accountSlice";

const TimeframeButtons = () => {

    const dispatch = useDispatch();

    const handleClick = (range) => {
        const end = lastValidDate().format("YYYY-MM-DD");
        switch (range) {
            case "Day":
                dispatch(fetchPortfolioHistory({ date_start: undefined, date_end: end, period: "1D", timeframe: "1Min" }));
                break;
            case "Week":
                dispatch(fetchPortfolioHistory({ date_start: undefined, date_end: end, period: "1W", timeframe: "15Min" }));
                break;
            case "1 Month":
                dispatch(fetchPortfolioHistory({ date_start: undefined, date_end: end, period: "1M", timeframe: "1D" }));
                break;
            case "3 Months":
                dispatch(fetchPortfolioHistory({ date_start: undefined, date_end: end, period: "3M", timeframe: "1D" }));
                break;
            case "6 Months":
                dispatch(fetchPortfolioHistory({ date_start: undefined, date_end: end, period: "6M", timeframe: "1D" }));
                break;
            case "1 Year":
                dispatch(fetchPortfolioHistory({ date_start: undefined, date_end: end, period: "1A", timeframe: "1D" }));
                break;
            default:
                return;
        }
    };

    return (
        <Box>
            <ButtonGroup variant="outlined" aria-label="Basic button group">
                <Button variant="contained" onClick={() => handleClick("Day")}>Day</Button>
                <Button variant="contained" onClick={() => handleClick("Week")}>Week</Button>
                <Button variant="contained" onClick={() => handleClick("1 Month")}>1 Month</Button>
                <Button variant="contained" onClick={() => handleClick("3 Months")}>3 Months</Button>
                <Button variant="contained" onClick={() => handleClick("6 Months")}>6 Months</Button>
                <Button variant="contained" onClick={() => handleClick("1 Year")}>1 Year</Button>
            </ButtonGroup>
        </Box>
    );
};

export default TimeframeButtons;