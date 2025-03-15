import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import Container from "@mui/material/Container";
import PositionsTable from './Positions/PositionsTable';

const Positions = () => {
    const { authState, oktaAuth } = useOktaAuth();

    if (!authState) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <Container>
            <PositionsTable />
        </Container>
    );
};
export default Positions;
