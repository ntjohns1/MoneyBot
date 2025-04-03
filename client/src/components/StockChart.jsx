import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import Container from "@mui/material/Container";
import StockHistoryChart from "./Stocks/StockHistoryChart";
import SearchInput from "./Stocks/SearchInput";

const StockChart = () => {
    const { authState, oktaAuth } = useOktaAuth();

    if (!authState) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <SearchInput />
            <StockHistoryChart />
        </Container>
    );
}
export default StockChart;