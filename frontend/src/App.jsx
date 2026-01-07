import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  CssBaseline,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { TrendingUp as TrendingUpIcon } from '@mui/icons-material';
import CoinSelector from './components/CoinSelector';
import PriceChart from './components/PriceChart';
import GainersLosersPanel from './components/GainersLosersPanel';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');

  const handleSelectCoin = (coinId) => {
    setSelectedCoin(coinId);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <TrendingUpIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Crypto Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Coin Selector */}
        <CoinSelector onSelectCoin={handleSelectCoin} />

        {/* Cryptocurrency Detailed Analysis */}
        <Typography variant="h5" component="h1" gutterBottom>
          Detailed Analysis
        </Typography>
        <PriceChart selectedCoin={selectedCoin} />

        {/*Top Gainers and Losers */}
        <Typography variant="h5" component="h1" gutterBottom sx={{ mt: 6 }}>
          Market Movers
        </Typography>
        <GainersLosersPanel />

        {/* Footer */}
        <Box mt={6} pt={3} borderTop={1} borderColor="divider">
          <Typography variant="body2" color="text.secondary" align="center">
             Design By Kunal Mehta
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;