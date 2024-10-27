import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useOktaAuth } from "@okta/okta-react";
import { setAccessToken } from "../service/axiosConfig";
import { Autocomplete, CircularProgress, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { fetchAllAssets } from "./AssetsSlice";
import { setOpen, setInputValue, setBarStart, setBarEnd } from "./StocksSlice";

const SearchInput = () => {
    const { authState, oktaAuth } = useOktaAuth();
    const assets = useSelector((state) => state.assets.allAssets);
    const loading = useSelector((state) => state.assets.loading);
    const start = useSelector((state) => state.stocks.barStart);
    const end = useSelector((state) => state.stocks.barEnd);
    const inputValue = useSelector((state) => state.stocks.inputValue);
    const open = useSelector((state) => state.stocks.open);
    const dispatch = useDispatch();

    useEffect(() => {
        if (authState.isAuthenticated) {
            const accessToken = oktaAuth.getAccessToken();
            setAccessToken(accessToken);
            dispatch(fetchAllAssets());
        }
    }, [authState, dispatch]);

    const handleOpen = () => {
        dispatch(setOpen(true));
    };

    const handleClose = () => {
        dispatch(setOpen(false));
    };

    const handleSetStart = (start) => {
        dispatch(setBarStart(start));
    }
    const handleSetEnd = (end) => {
        dispatch(setBarEnd(end));
    }

    const handleSetInputValue = (value) => {
        dispatch(setInputValue(value));
    }

    return (
        <Grid container spacing={2}>
            <Grid xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Start"
                        value={start}
                        onChange={(newValue) => handleSetStart(newValue)}
                    />
                    <DatePicker
                        label="End"
                        value={end}
                        onChange={(newValue) => handleSetEnd(newValue)}
                    />
                </LocalizationProvider>
                <Autocomplete
                    sx={{ width: 300 }}
                    open={open}
                    onOpen={handleOpen}
                    onClose={handleClose}
                    isOptionEqualToValue={(option, value) => option.symbol === value.symbol}
                    getOptionLabel={(option) => `${option.symbol} - ${option.name}`} // Format for stock symbol and company name
                    options={assets}
                    loading={loading}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => handleSetInputValue(newInputValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search Stocks"
                            slotProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                />
            </Grid>
        </Grid>
    );
};

export default SearchInput;

// {assets && (
//     <Grid xs={12}>
//         <Typography variant="h6">Selected Asset Data:</Typography>
//         <pre>{JSON.stringify(assets, null, 2)}</pre> {/* Display assets for debugging */}
//     </Grid>
// )}