import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import Container from "@mui/material/Container";
import StockHistoryChart from "./Stocks/StockHistoryChart";
const StockChart = () => {
    const { authState, oktaAuth } = useOktaAuth();

    if (!authState) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <StockHistoryChart />
        </Container>
    );
}