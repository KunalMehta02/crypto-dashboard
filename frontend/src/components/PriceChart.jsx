import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart
} from 'recharts';
import {
  Box,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert
} from '@mui/material';
import { cryptoAPI, handleApiError } from '../services/api';

const PriceChart = ({ selectedCoin }) => {
  const [chartData, setChartData] = useState([]);
  const [timeFrame, setTimeFrame] = useState('7');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedCoin) {
      fetchChartData();
    }
  }, [selectedCoin, timeFrame]);

  const fetchChartData = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await cryptoAPI.getMarketChart(selectedCoin, timeFrame);
      const data = response.data;
      
      // Transform data for chart
      const transformedData = data.prices.map((pricePoint, index) => ({
        timestamp: new Date(pricePoint[0]).toLocaleDateString(),
        price: pricePoint[1],
        volume: data.total_volumes[index][1],
        marketCap: data.market_caps[index][1]
      }));
      
      setChartData(transformedData);
    } catch (err) {
      setError(handleApiError(err).message);
    } finally {
      setLoading(false);
    }
  };

  const formatYAxis = (value) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  if (loading) {
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
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" component="h2">
          Price & Volume Analysis
        </Typography>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Time Frame</InputLabel>
          <Select
            value={timeFrame}
            label="Time Frame"
            onChange={(e) => setTimeFrame(e.target.value)}
          >
            {/* <MenuItem value="1">24 Hours</MenuItem> */}
            <MenuItem value="7">7 Days</MenuItem>
            <MenuItem value="14">14 Days</MenuItem>
            <MenuItem value="30">30 Days</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {chartData.length > 0 ? (
        <>
          {/* Price Chart */}
          <Typography variant="subtitle1" gutterBottom>
            Price Trend
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis yAxisId="left" tickFormatter={formatYAxis} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={formatYAxis} />
              <Tooltip 
                formatter={(value) => [`$${Number(value).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}`, '']}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="price"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
                name="Price"
              />
            </ComposedChart>
          </ResponsiveContainer>

          {/* Volume Chart */}
          <Typography variant="subtitle1" gutterBottom sx={{ mt: 4 }}>
            Trading Volume
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis tickFormatter={formatYAxis} />
              <Tooltip formatter={(value) => [formatYAxis(value), 'Volume']} />
              <Bar dataKey="volume" fill="#82ca9d" name="Volume" />
            </BarChart>
          </ResponsiveContainer>
        </>
      ) : (
        <Typography align="center" color="text.secondary">
          Select a cryptocurrency to view chart data
        </Typography>
      )}
    </Paper>
  );
};

export default PriceChart;