import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import WatchlistSelector from './WatchlistSelector';
import WatchlistManager from './WatchlistManager';
import WatchlistTable from './WatchlistTable';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1a1a1a',
  color: '#ffffff',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden', // Prevent double scrollbars
}));

const WatchlistContainer = () => {
  return (
    <StyledPaper elevation={3}>
      <WatchlistSelector />
      <WatchlistManager />
      <Box sx={{ 
        flex: 1,
        minHeight: 0, // Important for nested flex containers
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <WatchlistTable />
        </Box>
      </Box>
    </StyledPaper>
  );
};

export default WatchlistContainer;
