import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useOktaAuth } from "@okta/okta-react";
import { setAccessToken } from "../service/axiosConfig";
import { FormControl, InputLabel, OutlinedInput, Select, MenuItem, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { fetchAllAssets } from "./AssetsSlice";
import { fetchStockBars, setFormField } from "./StocksSlice";

const SearchInput = () => {
    const { authState, oktaAuth } = useOktaAuth();
    const assets = useSelector((state) => state.assets.allAssets);
    const formState = useSelector((state) => state.stocks.formState);
    const bars = useSelector((state) => state.stocks.bars)
    const dispatch = useDispatch();

    const { symbol, start, end, timeframe, timeframeUnit } = formState;

    useEffect(() => {
        if (authState.isAuthenticated) {
            const accessToken = oktaAuth.getAccessToken();
            setAccessToken(accessToken);
            dispatch(fetchAllAssets());
        }

    }, [authState, dispatch]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (authState && authState.isAuthenticated) {
            const accessToken = oktaAuth.getAccessToken();
            setAccessToken(accessToken);
            dispatch(fetchStockBars({ symbol, start, end, timeframe, timeframeUnit }));
        }
    }

    const handleDateChange = (field) => (newValue) => {
        dispatch(setFormField({ field, value: newValue ? newValue.toISOString().slice(0, 10) : "" }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch(setFormField({ field: name, value }));
        console.log(name, value);

    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                {/* First row: Date pickers and symbol input */}
                <Grid container spacing={2} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Grid xs={4}>
                            <DatePicker
                                label="Start"
                                name="start"
                                value={start ? dayjs(start) : null}
                                onChange={handleDateChange("start")}
                            />
                        </Grid>
                        <Grid xs={4}>
                            <DatePicker
                                label="End"
                                name="end"
                                value={end ? dayjs(end) : null}
                                onChange={handleDateChange("end")}
                            />
                        </Grid>
                    </LocalizationProvider>
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

                {/* Second row: Timeframe and Timeframe Unit */}
                <Grid container spacing={2} xs={12}>
                    <Grid xs={6}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="timeframe">Timeframe</InputLabel>
                            <OutlinedInput
                                id="timeframe"
                                type="number"
                                name="timeframe"
                                label="Timeframe"
                                value={timeframe || 1}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="timeframe-unit-label">Time Unit</InputLabel>
                            <Select
                                labelId="timeframe-unit-label"
                                id="timeframeUnit"
                                name="timeframeUnit"
                                value={timeframeUnit || "MIN"}
                                label="Timeframe Unit"
                                onChange={handleInputChange}
                            >
                                <MenuItem value="MIN">Minutes</MenuItem>
                                <MenuItem value="HOUR">Hours</MenuItem>
                                <MenuItem value="DAY">Days</MenuItem>
                                <MenuItem value="WEEK">Weeks</MenuItem>
                                <MenuItem value="MONTH">Months</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                {/* Submit button */}
                <Grid container spacing={2} xs={12}>
                    <Grid xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
};

export default SearchInput;