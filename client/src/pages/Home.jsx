import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import Container from "@mui/material/Container";
import DashboardLayout from '../layout/DashboardLayout';

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
    // <Container>
      <DashboardLayout />
    // </Container>
  );
};
export default Home;
