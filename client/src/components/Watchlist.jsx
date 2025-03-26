import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import Container from "@mui/material/Container";
import WatchlistContainer from "./Watchlist/WatchlistContainer";

const Watchlist = () => {
    const { authState, oktaAuth } = useOktaAuth();

    return (
        <Container>
            <WatchlistContainer />
        </Container>
    );
}

export default Watchlist;