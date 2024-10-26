import React, { useEffect, useState } from "react";
import { Autocomplete, CircularProgress, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { setAccessToken } from "../service/axiosConfig";
import { useOktaAuth } from "@okta/okta-react";
import { getAssets } from "../service/alpaca";
import { DatePicker } from '@mui/x-date-pickers';
import dayjss from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const SearchInput = () => {
    const { authState, oktaAuth } = useOktaAuth();
    const [assets, setAssets] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleOpen = () => {
        if (authState && authState.isAuthenticated) {
            setOpen(true);
            (async () => {
                setLoading(true);
                const accessToken = oktaAuth.getAccessToken();
                setAccessToken(accessToken);
                const data = await getAssets();
                setLoading(false);

                setAssets(data);
            })();
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid container spacing={2}>
            <Grid xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Start"
                    // value={value}
                    // onChange={(newValue) => setValue(newValue)}
                    />
                    <DatePicker
                        label="End"
                    // value={value}
                    // onChange={(newValue) => setValue(newValue)}
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
                    onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
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