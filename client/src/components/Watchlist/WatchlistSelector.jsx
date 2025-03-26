import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedWatchlist, removeWatchlist } from './watchlistSlice';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
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
  const { watchlists, selectedWatchlist } = useSelector((state) => state.watchlist);

  const handleChange = (event, newValue) => {
    const selected = watchlists.find(w => w.id === newValue);
    if (selected) {
      dispatch(setSelectedWatchlist(selected));
    }
  };

  const handleDelete = async (event, watchlistId) => {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete this watchlist?')) {
      await dispatch(removeWatchlist(watchlistId));
    }
  };

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
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {watchlist.name}
                <IconButton
                  size="small"
                  onClick={(e) => handleDelete(e, watchlist.id)}
                  sx={{
                    ml: 1,
                    color: '#f44336',
                    '&:hover': {
                      backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            }
          />
        ))}
      </StyledTabs>
    </Box>
  );
};

export default WatchlistSelector;
