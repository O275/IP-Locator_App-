import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import IpSearch from './IpSearch';
import Map from './Map';
import LoginButton from './LoginButton';
import { Container, Button, Typography, Box, Switch, ThemeProvider, createTheme } from '@mui/material';
import './App.css';

function App() {
  const [lat, setLat] = useState(0.0);
  const [lon, setLon] = useState(0.0);
  const [ipDetails, setIpDetails] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState('light');
  const [gmailData, setGmailData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const appTheme = useMemo(() =>
    createTheme({
      palette: {
        mode
      }
    }), [mode]
  );

  useEffect(() => {
    console.log('Checking authentication...');
    axios.get('http://localhost:5000/check-auth', { withCredentials: true })
      .then(response => {
        console.log('Authenticated:', response.data);
        setIsAuthenticated(response.data.authenticated);
        setUser(response.data.user);
      })
      .catch(error => {
        console.log('Authentication error:', error);
        setIsAuthenticated(false);
      });
  }, []);

  const fetchIpDetails = (ip) => {
    const apiKey = process.env.REACT_APP_IPAPI_KEY;
    const url = ip
      ? `http://api.ipapi.com/api/${ip}?access_key=${apiKey}`
      : `http://api.ipapi.com/api/check?access_key=${apiKey}`;

    axios.get(url)
      .then((res) => {
        setIpDetails(res.data);
        if (res.data.latitude && res.data.longitude) {
          setLat(res.data.latitude);
          setLon(res.data.longitude);
        }
      })
      .catch((error) => {
        console.error('Error fetching IP details:', error);
      });
  };

  const handleLogout = () => {
    axios.get('http://localhost:5000/logout', { withCredentials: true })
      .then(() => {
        setIsAuthenticated(false);
        setUser(null);
      })
      .catch(error => {
        console.error('Logout error:', error);
      });
  };

  const fetchGmailData = () => {
    setLoading(true);
    setError(null);

    axios.get('http://localhost:5000/gmail-data', { withCredentials: true })
      .then(response => {
        console.log('Gmail Data:', response.data);
        setGmailData(response.data);
      })
      .catch(error => {
        console.error('Error fetching Gmail data:', error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data : error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ThemeProvider theme={appTheme}>
      <Box
        data-testid={'app-cont'}
        component="main"
        sx={{
          display: 'flex',
          height: '100vh',
          width: '100vw',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.default',
          color: 'text.primary',
          margin: '0px'
        }}
      >
        <Typography component="h1" variant="h5" sx={{ marginBottom: '20px' }}>
          IP Address Locator
        </Typography>

        {!isAuthenticated ? (
          <LoginButton />
        ) : (
          <>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleLogout}
              sx={{ marginBottom: '20px' }}
            >
              Logout
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={fetchGmailData}
              sx={{ marginBottom: '20px' }}
              disabled={loading}
            >
              {loading ? 'Fetching Gmail Data...' : 'Fetch Gmail Data'}
            </Button>

            {error && (
              <Typography variant="body1" color="error" sx={{ marginBottom: '20px' }}>
                Error: {error}
              </Typography>
            )}

            <div className="content">
              <div className="info">
                <IpSearch onSearch={fetchIpDetails} />
                <Typography variant="h6">IP address</Typography>
                <Typography variant="h4" id="ip">{ipDetails.ip || 'N/A'}</Typography>
                <Typography variant="h6">Approximate Location:</Typography>
                <Typography>
                  {ipDetails.city || 'City not available'},
                  {ipDetails.region_name || 'Region not available'},
                  {ipDetails.country_name || 'Country not available'}.
                </Typography>
                <Typography variant="h6">Internet Service Provider (ISP):</Typography>
                <Typography>{ipDetails.org || 'ISP not available'}</Typography>
              </div>

              <Map lat={lat} lon={lon} />
            </div>

            {gmailData && (
              <div>
                <Typography variant="h6">Gmail Messages:</Typography>
                <pre>{JSON.stringify(gmailData, null, 2)}</pre>
              </div>
            )}
          </>
        )}

        <Box
          position="fixed"
          bottom={20}
          right={20}
          sx={{
            backgroundColor: 'background.default',
            padding: '10px',
            borderRadius: '8px',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2" sx={{ mr: 2 }}>
            Dark Mode
          </Typography>
          <Switch
            checked={mode === 'dark'}
            onChange={() => {
              setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
            }}
            name="darkModeSwitch"
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
