import React, { useEffect, useState } from "react";
import { Box, Input, Select, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { setAccessToken } from "../service/axiosConfig";
import { useOktaAuth } from "@okta/okta-react";
import { getAsset, getAssets } from "../service/alpaca";

const SearchInput = () => {
    const { authState, oktaAuth } = useOktaAuth();
    const [assets, setAssets] = useState([]);

    const fetchAssets = async () => {
        if (authState && authState.isAuthenticated) {
            const accessToken = oktaAuth.getAccessToken();
            setAccessToken(accessToken);
            const data = await getAssets();
            setAssets(data);
        }
    }


    return (
        <Grid container spacing={2}>
            <Button onClick={fetchAssets}>Click Me</Button>
            {assets && (
                <Grid xs={12}>
                    <Typography variant="h6">Assets Data:</Typography>
                    <pre>{JSON.stringify(assets, null, 2)}</pre>
                </Grid>
            )}
        </Grid>
    );
};

export default SearchInput;