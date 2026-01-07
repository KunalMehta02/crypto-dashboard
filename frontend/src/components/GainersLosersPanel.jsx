import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Avatar,
  CircularProgress,
  Alert
} from '@mui/material';
import { TrendingUp, TrendingDown, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { cryptoAPI, handleApiError } from '../services/api';

const GainersLosersPanel = () => {
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGainersLosers();
    // Refresh every 60 seconds
    const interval = setInterval(fetchGainersLosers, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchGainersLosers = async () => {
    setLoading(true);
    setError('');
    
    try {
      const [gainersRes, losersRes] = await Promise.all([
        cryptoAPI.getTopGainers(5),
        cryptoAPI.getTopLosers(5)
      ]);
      
      setGainers(gainersRes.data);
      setLosers(losersRes.data);
    } catch (err) {
      setError(handleApiError(err).message);
    } finally {
      setLoading(false);
    }
  };

  const CryptoCard = ({ crypto, isGainer }) => {
    const changePercent = crypto.price_change_percentage_24h;
    const ChangeIcon = isGainer ? ArrowUpward : ArrowDownward;

    return (
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center">
              <Avatar 
                src={crypto.image} 
                alt={crypto.name}
                sx={{ width: 40, height: 40, mr: 2 }}
              />
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {crypto.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {crypto.symbol.toUpperCase()}
                </Typography>
              </Box>
            </Box>
            
            <Box textAlign="right">
              <Typography variant="h6" fontWeight="bold">
                ${crypto.current_price.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </Typography>
              <Chip
                icon={<ChangeIcon />}
                label={`${Math.abs(changePercent).toFixed(2)}%`}
                color={isGainer ? 'success' : 'error'}
                size="small"
                variant="outlined"
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  if (loading && gainers.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={400}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Grid container spacing={3}>
      {/* Top Gainers */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
          <Box display="flex" alignItems="center" mb={3}>
            <TrendingUp color="success" sx={{ mr: 1 }} />
            <Typography variant="h6" component="h2">
              Top Gainers (24h)
            </Typography>
          </Box>
          
          {gainers.length > 0 ? (
            gainers.map((crypto) => (
              <CryptoCard key={crypto.id} crypto={crypto} isGainer={true} />
            ))
          ) : (
            <Typography align="center" color="text.secondary">
              No gainers data available
            </Typography>
          )}
        </Paper>
      </Grid>

      {/* Top Losers */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
          <Box display="flex" alignItems="center" mb={3}>
            <TrendingDown color="error" sx={{ mr: 1 }} />
            <Typography variant="h6" component="h2">
              Top Losers (24h)
            </Typography>
          </Box>
          
          {losers.length > 0 ? (
            losers.map((crypto) => (
              <CryptoCard key={crypto.id} crypto={crypto} isGainer={false} />
            ))
          ) : (
            <Typography align="center" color="text.secondary">
              No losers data available
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default GainersLosersPanel;