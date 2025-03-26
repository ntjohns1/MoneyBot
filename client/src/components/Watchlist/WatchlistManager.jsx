import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createNewWatchlist,
  addSymbol,
  fetchWatchlistById,
} from './watchlistSlice';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    color: '#ffffff',
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
  const [openDialog, setOpenDialog] = useState(false);
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleAddSymbol = async (e) => {
    e.preventDefault();
    if (!symbol || !selectedWatchlist) return;

    try {
      const trimmedSymbol = symbol.trim().toUpperCase();
      await dispatch(addSymbol({ id: selectedWatchlist.id, symbol: trimmedSymbol })).unwrap();
      // Refresh the watchlist after adding symbol
      dispatch(fetchWatchlistById(selectedWatchlist.id));
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

  const handleCreateWatchlist = async (e) => {
    e.preventDefault();
    if (!newWatchlistName) return;

    try {
      await dispatch(createNewWatchlist({ name: newWatchlistName, symbols: [] })).unwrap();
      setNewWatchlistName('');
      setOpenDialog(false);
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
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          p: 2,
          backgroundColor: '#1a1a1a',
          borderBottom: 1,
          borderColor: '#333333',
        }}
      >
        <Box component="form" onSubmit={handleAddSymbol} sx={{ display: 'flex', gap: 1, flex: 1 }}>
          <StyledTextField
            size="small"
            label="Add Symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            disabled={!selectedWatchlist}
            sx={{ flex: 1 }}
          />
          <StyledButton
            type="submit"
            variant="contained"
            disabled={!selectedWatchlist || !symbol}
            startIcon={<AddIcon />}
          >
            Add
          </StyledButton>
        </Box>
        <StyledButton
          variant="contained"
          onClick={() => setOpenDialog(true)}
          startIcon={<AddIcon />}
        >
          New Watchlist
        </StyledButton>
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#1a1a1a',
            color: '#ffffff',
          },
        }}
      >
        <DialogTitle>Create New Watchlist</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleCreateWatchlist} sx={{ mt: 2 }}>
            <StyledTextField
              autoFocus
              label="Watchlist Name"
              fullWidth
              value={newWatchlistName}
              onChange={(e) => setNewWatchlistName(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: '#999999' }}>
            Cancel
          </Button>
          <StyledButton
            onClick={handleCreateWatchlist}
            disabled={!newWatchlistName}
          >
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
