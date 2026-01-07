import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Autocomplete,
  CircularProgress,
  Alert
} from '@mui/material';
import { cryptoAPI, handleApiError } from '../services/api';

const CoinSelector = ({ onSelectCoin }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    fetchCoinList();
  }, []);

  const fetchCoinList = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await cryptoAPI.getCoinList();
      // Filter to show only popular coins for better UX
      const popularCoins = ['bitcoin', 'ethereum', 'cardano', 'solana', 'ripple', 
                          'polkadot', 'dogecoin', 'matic-network', 'litecoin'];
      
      const filteredCoins = response.data
        .filter(coin => popularCoins.includes(coin.id))
        .map(coin => ({
          id: coin.id,
          label: `${coin.name} (${coin.symbol.toUpperCase()})`
        }));
      
      setCoins(filteredCoins);
    } catch (err) {
      setError(handleApiError(err).message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event, newValue) => {
    setSelectedCoin(newValue);
    if (newValue && newValue.id) {
      onSelectCoin(newValue.id);
    }
  };

  return (
    <Box mb={4}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Autocomplete
        options={coins}
        loading={loading}
        value={selectedCoin}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Cryptocurrency"
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </Box>
  );
};

export default CoinSelector;