import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from '@mui/material/Grid2';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AccountOverview from "../components/AccountOverview";
import StockChart from "../components/StockChart";
import Watchlist from "../components/Watchlist";
import Positions from "../components/Positions";
import Orders from "../components/Orders";


// Custom dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
  },
});

const DashboardLayout = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, p: 2, height: "95vh" }}>
        <Grid container spacing={2} sx={{ height: "100%" }}>
          {/* Left Sidebar (Account Overview + Stocks to Buy) */}
          <Grid item xs={12} md={2} sx={{ height: "100%" }}>
            <Paper sx={{ height: "50%", p: 2 }}>
              <AccountOverview title="Account Overview" />
            </Paper>
            <Paper sx={{ height: "50%", p: 2, mt: 2 }}>
              <Watchlist title="Stocks to Buy" />
            </Paper>
          </Grid>

          {/* Main Chart Section */}
          <Grid item xs={12} md={8}>
            <Paper sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: "100%", p: 2
            }}>
              <StockChart title="Stock Chart" />
            </Paper>
          </Grid>

          {/* Right Sidebar (Recent Orders + Positions) */}
          <Grid item xs={12} md={2} sx={{ height: "100%" }}>
            <Paper sx={{ height: "50%", p: 2 }}>
              <Orders title="Recent Orders" />
            </Paper>
            <Paper sx={{ height: "50%", p: 2, mt: 2 }}>
              <Positions title="Positions" />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default DashboardLayout;