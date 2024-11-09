import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useOktaAuth } from "@okta/okta-react";
import { setAccessToken } from "../../service/axiosConfig";
import Box from "@mui/material/Box";
import { LineChart } from "@mui/x-charts";
import { fetchPortfolioHistory } from "./accountSlice";

const HistoryChart = () => {

    return (
        <Box>
            
        </Box>
    );
};