import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { NavLink } from 'react-router-dom';
import { Box, Toolbar, AppBar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';


const HomeNavbar = () => {
  const { authState, oktaAuth } = useOktaAuth();

  const login = async () => oktaAuth.signInWithRedirect();
  const logout = async () => oktaAuth.signOut();

  if (!authState) {
    return null;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MoneyBot
          </Typography>
          {authState && (
            <div>
              <Button component={NavLink} to="/" color="inherit">Home</Button>
              <Button onClick={logout} color="inherit">Logout</Button>
            </div>
          )}

          {!authState && (
            <Button onClick={login()} color="inherit">Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default HomeNavbar;
