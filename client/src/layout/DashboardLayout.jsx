import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from '@mui/material/Grid2';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid container spacing={2} sx={{ height: "100vh" }}>
          {/* Left Sidebar (Account Overview + Stocks to Buy) */}
          <Grid item xs={12} md={3} container direction="column" spacing={2}>
            <Grid item>
              <Placeholder title="Account Overview" />
            </Grid>
            <Grid item>
              <Placeholder title="Stocks to Buy" />
            </Grid>
          </Grid>

          {/* Main Chart Section */}
          <Grid item xs={12} md={6}>
            <Placeholder title="Stock Chart" />
          </Grid>

          {/* Right Sidebar (Recent Orders + Positions) */}
          <Grid item xs={12} md={3} container direction="column" spacing={2}>
            <Grid item>
              <Placeholder title="Recent Orders" />
            </Grid>
            <Grid item>
              <Placeholder title="Positions" />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default DashboardLayout;