import React, { useState } from "react";
import { Box, OutlinedInput, FormControl, Select, InputLabel, MenuItem, Button, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { getAssets, getBarsForSymbol } from "../service/alpaca.js";
import { setAccessToken } from "../service/axiosConfig.js";
import { useOktaAuth } from "@okta/okta-react";

const TestForm = () => {
    const { authState, oktaAuth } = useOktaAuth();
    const [bars, setBars] = useState(null);
    const [assets, setAssets] = useState([]);
    const [formState, setFormState] = useState({ symbol: '', start: '2024-10-17', end: '2024-10-18', timeframe: 1, timeframeUnit: 'MIN' });
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const fetchAssets = async () => {
        if (authState && authState.isAuthenticated) {
            const accessToken = oktaAuth.getAccessToken();
            setAccessToken(accessToken);
            const res = await getAssets();
            console.log(res);
            
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        try {
            if (authState && authState.isAuthenticated) {
                const accessToken = oktaAuth.getAccessToken();
                setAccessToken(accessToken);

                const res = await getBarsForSymbol(
                    formState.symbol,
                    formState.start,
                    formState.end,
                    parseInt(formState.timeframe),
                    formState.timeframeUnit
                );
                setBars(res);
            } else {
                setError("User is not authenticated.");
            }
        } catch (error) {
            setError("Failed to fetch data for the symbol.");
            console.error(error);
        }
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: { xs: 1, sm: 6 },
            pb: { xs: 1, sm: 12 },
        }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {/* Symbol Input */}
                    <Grid xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="symbol">Symbol</InputLabel>
                            <OutlinedInput
                                id="symbol"
                                name="symbol"
                                label="Symbol"
                                value={formState.symbol}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>

                    {/* Timeframe Input */}
                    <Grid xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="timeframe">Timeframe</InputLabel>
                            <OutlinedInput
                                id="timeframe"
                                type="number"
                                name="timeframe"
                                label="Timeframe"
                                value={formState.timeframe}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>

                    {/* Timeframe Unit Select */}
                    <Grid xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="timeframe-unit-label">Time Unit</InputLabel>
                            <Select
                                labelId="timeframe-unit-label"
                                id="timeframeUnit"
                                name="timeframeUnit"
                                value={formState.timeframeUnit}
                                label="Timeframe Unit"
                                onChange={handleChange}
                            >
                                <MenuItem value="MIN">Minutes</MenuItem>
                                <MenuItem value="HOUR">Hours</MenuItem>
                                <MenuItem value="DAY">Days</MenuItem>
                                <MenuItem value="WEEK">Weeks</MenuItem>
                                <MenuItem value="MONTH">Months</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Submit Button */}
                    <Grid xs={12}>
                        <Button variant="contained" color="primary" type="submit">
                            Fetch Data
                        </Button>
                    </Grid>

                    {/* Bars Data */}
                    {assets && (
                        <Grid xs={12}>
                            <Typography variant="h6">Bars Data:</Typography>
                            <pre>{JSON.stringify(assets, null, 2)}</pre>
                        </Grid>
                    )}

                    {/* Error Message */}
                    {error && (
                        <Grid xs={12}>
                            <Typography color="error">{error}</Typography>
                        </Grid>
                    )}
                </Grid>
            </form>
        </Box>
    );
};

export default TestForm;