import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useOktaAuth } from "@okta/okta-react";
import { setAccessToken } from "../../service/axiosConfig";
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid2";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { fetchAllAssets } from "../AssetsSlice";
import { setFormField, setTimeframe } from "./StocksSlice";
import { lastValidDate } from "../../util/dayjsHelper";
import { fetchAccountInfo, fetchPortfolioHistory } from "../Portfolio/accountSlice";

const SearchInput = () => {
    const { authState, oktaAuth } = useOktaAuth();
    const assets = useSelector((state) => state.assets.allAssets);
    const formState = useSelector((state) => state.stocks.formState);
    const bars = useSelector((state) => state.stocks.bars)
    const accountInfo = useSelector((state) => state.account.accountInfo);

    const dispatch = useDispatch();

    const { symbol, start, end, timeframe, timeframeUnit } = formState;

    const portfolioHistory = useSelector((state) => state.account.portfolioHistory);

    


    useEffect(() => {
        if (authState.isAuthenticated) {
            const accessToken = oktaAuth.getAccessToken();
            setAccessToken(accessToken);
            dispatch(fetchAllAssets());
            dispatch(fetchPortfolioHistory(lastValidDate(), lastValidDate(), "1D","all"));            
        }

    }, [authState, dispatch]);

    const handleClick = (range) => {
        let start, timeframe, timeframeUnit;
        console.log(formState);

        switch (range) {
            case "Day":
                start = lastValidDate().format("YYYY-MM-DD");
                timeframe = 1;
                timeframeUnit = "MIN";
                break;
            case "Week":
                start = lastValidDate().subtract(1, "week").format("YYYY-MM-DD");
                timeframe = 15;
                timeframeUnit = "MIN";
                break;
            case "1 Month":
                start = lastValidDate().subtract(1, "month").format("YYYY-MM-DD");
                timeframe = 1;
                timeframeUnit = "Day";
                break;
            case "3 Months":
                start = lastValidDate().subtract(3, "month").format("YYYY-MM-DD");
                timeframe = 1;
                timeframeUnit = "DAY";
                break;
            case "6 Months":
                start = lastValidDate().subtract(6, "month").format("YYYY-MM-DD");
                timeframe = 1;
                timeframeUnit = "DAY";
                break;
            case "1 Year":
                start = lastValidDate().subtract(12, "month").format("YYYY-MM-DD");
                timeframe = 1;
                timeframeUnit = "DAY";
                break;
            default:
                return;
        }

        dispatch(setTimeframe({ start, end, timeframe, timeframeUnit }));
    };

    // const handleFetch = async (range) => {
    //     if (authState && authState.isAuthenticated) {
    //         const accessToken = oktaAuth.getAccessToken();
    //         setAccessToken(accessToken);
    //         dispatch(fetchStockBars({ symbol, start, end, timeframe, timeframeUnit }));
    //     }
    // }

    const handleDateChange = (field) => (newValue) => {
        dispatch(setFormField({ field, value: newValue ? newValue.toISOString().slice(0, 10) : "" }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch(setFormField({ field: name, value }));
        console.log(name, value);

    };

    return (
        <Grid container spacing={2}>
            <Grid container spacing={2} xs={12}>
                <Grid container spacing={2} xs={12}>
                    <ButtonGroup variant="outlined" aria-label="Basic button group">
                        <Button variant="contained" onClick={() => handleClick("Day")}>Day</Button>
                        <Button variant="contained" onClick={() => handleClick("Week")}>Week</Button>
                        <Button variant="contained" onClick={() => handleClick("1 Month")}>1 Month</Button>
                        <Button variant="contained" onClick={() => handleClick("3 Months")}>3 Months</Button>
                        <Button variant="contained" onClick={() => handleClick("6 Months")}>6 Months</Button>
                        <Button variant="contained" onClick={() => handleClick("1 Year")}>1 Year</Button>
                    </ButtonGroup>
                </Grid>
                <Grid xs={4}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="symbol">Symbol</InputLabel>
                        <OutlinedInput
                            id="symbol"
                            label="Symbol"
                            name="symbol"
                            value={symbol || ""}
                            onChange={handleInputChange}
                        />
                    </FormControl>

                </Grid>
            </Grid>
        </Grid>
    );
};

export default SearchInput;