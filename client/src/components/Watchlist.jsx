import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import Container from "@mui/material/Container";

const Watchlist = () => {
    const { authState, oktaAuth } = useOktaAuth();

    return (
        <Container>
            <h1>Watchlist</h1>
        </Container>    
    );
}
export default Watchlist;