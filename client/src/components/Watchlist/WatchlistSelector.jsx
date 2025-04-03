import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedWatchlist, deleteWatchlist, fetchWatchlistById } from './watchlistSlice';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

const StyledTabs = styled(Tabs)(({ theme }) => ({
  backgroundColor: '#1a1a1a',
  minHeight: '48px',
  '& .MuiTabs-indicator': {
    backgroundColor: '#4caf50',
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  color: '#ffffff',
  minHeight: '48px',
  textTransform: 'none',
  fontSize: '0.875rem',
  '&.Mui-selected': {
    color: '#4caf50',
  },
}));

const WatchlistSelector = () => {
  const dispatch = useDispatch();
  const watchlistState = useSelector((state) => state.watchlist);
  const watchlists = Array.isArray(watchlistState?.watchlists) ? watchlistState.watchlists : [];
  const selectedWatchlist = watchlistState?.selectedWatchlist;

  const handleChange = async (event, newValue) => {
    const selected = watchlists.find(w => w.id === newValue);
    if (selected) {
      // First fetch the full watchlist data
      await dispatch(fetchWatchlistById(selected.id));
      // Then set it as selected (this will now have the symbols)
      
      const updatedWatchlist = watchlistState.watchlists.find(w => w.id === selected.id);
      if (updatedWatchlist) {
        dispatch(setSelectedWatchlist(updatedWatchlist));
      }
    }
  };

  const handleDelete = async (event, watchlistId) => {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete this watchlist?')) {
      await dispatch(deleteWatchlist(watchlistId));
    }
  };

  const renderTabLabel = (watchlist) => (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <span style={{ flexGrow: 1 }}>{watchlist.name}</span>
      <DeleteIcon
        fontSize="small"
        onClick={(e) => handleDelete(e, watchlist.id)}
        sx={{
          ml: 1,
          color: '#f44336',
          cursor: 'pointer',
          '&:hover': {
            color: '#d32f2f',
          },
        }}
      />
    </Box>
  );

  // Only render tabs if we have valid watchlists array
  if (!watchlists.length) {
    return (
      <Box sx={{ borderBottom: 1, borderColor: '#333333', p: 2 }}>
        No watchlists available
      </Box>
    );
  }

  return (
    <Box sx={{ borderBottom: 1, borderColor: '#333333' }}>
      <StyledTabs
        value={selectedWatchlist?.id || false}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        {watchlists.map((watchlist) => (
          <StyledTab
            key={watchlist.id}
            value={watchlist.id}
            label={renderTabLabel(watchlist)}
          />
        ))}
      </StyledTabs>
    </Box>
  );
};

export default WatchlistSelector;
