import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllWatchlists } from './watchlistSlice';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import WatchlistSelector from './WatchlistSelector';
import WatchlistManager from './WatchlistManager';
import WatchlistTable from './WatchlistTable';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden', // Prevent double scrollbars
}));

const WatchlistContainer = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.watchlist);

  useEffect(() => {
    dispatch(fetchAllWatchlists());
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

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
