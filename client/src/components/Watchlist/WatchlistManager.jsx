import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSymbol, createWatchlist } from './watchlistSlice';
import {
  Box,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  gap: theme.spacing(1),
  backgroundColor: '#1a1a1a',
  borderBottom: `1px solid #333333`,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#333333',
    },
    '&:hover fieldset': {
      borderColor: '#4caf50',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#4caf50',
    },
  },
  '& .MuiInputBase-input': {
    color: '#ffffff',
  },
  '& .MuiInputLabel-root': {
    color: '#999999',
    '&.Mui-focused': {
      color: '#4caf50',
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#4caf50',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#45a049',
  },
}));

const WatchlistManager = () => {
  const dispatch = useDispatch();
  const { selectedWatchlist } = useSelector((state) => state.watchlist);
  const [symbol, setSymbol] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleAddSymbol = async (e) => {
    e.preventDefault();
    if (!symbol || !selectedWatchlist) return;

    try {
      const trimmedSymbol = symbol.trim().toUpperCase();
      await dispatch(addSymbol({ id: selectedWatchlist.id, symbol: trimmedSymbol }));
      setSymbol('');
      setSnackbar({
        open: true,
        message: `Added ${trimmedSymbol} to watchlist`,
        severity: 'success'
      });
    } catch (error) {
      console.error('Failed to add symbol:', error);
      setSnackbar({
        open: true,
        message: error.message || 'Failed to add symbol',
        severity: 'error'
      });
    }
  };

  const handleCreateWatchlist = async () => {
    if (!newWatchlistName.trim()) return;
    try {
      await dispatch(createWatchlist(newWatchlistName.trim()));
      setNewWatchlistName('');
      setShowCreateDialog(false);
      setSnackbar({
        open: true,
        message: 'Watchlist created successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Failed to create watchlist:', error);
      setSnackbar({
        open: true,
        message: error.message || 'Failed to create watchlist',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <StyledBox component="form" onSubmit={handleAddSymbol}>
        <StyledTextField
          size="small"
          placeholder="Add symbol..."
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          disabled={!selectedWatchlist}
        />
        <IconButton
          type="submit"
          disabled={!selectedWatchlist || !symbol}
          color="primary"
          size="small"
        >
          <AddIcon />
        </IconButton>
        <StyledButton
          variant="contained"
          size="small"
          onClick={() => setShowCreateDialog(true)}
          sx={{ ml: 'auto' }}
        >
          New Watchlist
        </StyledButton>
      </StyledBox>

      <Dialog open={showCreateDialog} onClose={() => setShowCreateDialog(false)}>
        <DialogTitle>Create New Watchlist</DialogTitle>
        <DialogContent>
          <StyledTextField
            autoFocus
            margin="dense"
            label="Watchlist Name"
            fullWidth
            value={newWatchlistName}
            onChange={(e) => setNewWatchlistName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCreateDialog(false)}>Cancel</Button>
          <StyledButton onClick={handleCreateWatchlist} variant="contained" color="primary">
            Create
          </StyledButton>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default WatchlistManager;
