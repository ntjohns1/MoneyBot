import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import Container from "@mui/material/Container";
import WatchlistTable from "./Watchlist/WatchlistTable";

const Watchlist = () => {
    const { authState, oktaAuth } = useOktaAuth();

    return (
        <Container>
            <WatchlistTable />
        </Container>    
    );
}
export default Watchlist;