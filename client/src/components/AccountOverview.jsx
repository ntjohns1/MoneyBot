import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import Container from "@mui/material/Container";
import Equity from './Portfolio/Equity';
import HistoryChart from './Portfolio/HistoryChart';


const AccountOverview = () => {
  const { authState, oktaAuth } = useOktaAuth();

  if (!authState) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <Container>
      <Equity />
      <HistoryChart />
    </Container>
  );
};
export default AccountOverview;
