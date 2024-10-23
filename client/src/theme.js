import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#160F29',
    },
    secondary: {
      main: '#246A73',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;