import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import Container from "@mui/material/Container";
import SearchInput from '../components/Stocks/SearchInput';
import StockHistoryChart from "../components/Stocks/StockHistoryChart";
import Equity from '../components/Portfolio/Equity';
import HistoryChart from '../components/Portfolio/HistoryChart';
import TimeframeButtons from '../components/Portfolio/TimeframeButtons';
import PositionsTable from '../components/Positions/PositionsTable';

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth]);

  const login = async () => {
    await oktaAuth.signInWithRedirect();
  };



  if (!authState) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <Container>
      <Equity />
      <HistoryChart />
      <PositionsTable />
    </Container>
  );
};
export default Home;
