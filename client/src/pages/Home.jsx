import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { Container } from "@mui/material";
import TestForm from './TestForm';
import SearchInput from '../components/SearchInput';
import StockHistoryChart from "../components/Stocks/StockHistoryChart";

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

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
      {/* <TestForm/> */}
      <SearchInput />
      <StockHistoryChart />
    </Container>
  );
};
export default Home;
