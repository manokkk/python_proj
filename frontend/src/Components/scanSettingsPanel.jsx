import React, { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography, Box } from '@mui/material';
import axios from 'axios';

const ScanSettingsPanel = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState(false);
  const [scanResults, setScanResults] = useState(null);

  const handleStartScan = () => {
    const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/\S*)?$/;
    if (urlPattern.test(url)) {
      setError(false);
      // Make the API call to trigger scan
      axios.post('http://127.0.0.1:8000/api/scan/', { url })
        .then(response => {
          setScanResults(response.data);
        })
        .catch(error => {
          console.error('Error occurred while scanning:', error);
        });
    } else {
      setError(true);
    }
  };
  

  return (
    <Grid container justifyContent="center" spacing={3}>
      <Grid item xs={12} md={8}>
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            Scan Website
          </Typography>
          <TextField
            label="Website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            error={error}
            helperText={error ? "Please enter a valid URL" : ""}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Button 
            variant="contained" 
            onClick={handleStartScan} 
            sx={{ marginBottom: 2 }}
            fullWidth
          >
            Start Scan
          </Button>

          {scanResults && (
            <Box sx={{ marginTop: 3 }}>
              <Typography variant="h5">Scan Results</Typography>

              {/* Open Ports */}
              {scanResults.open_ports && (
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="h6">Open Ports:</Typography>
                  {scanResults.open_ports.length > 0 ? (
                    scanResults.open_ports.map((port, index) => (
                      <Typography key={index} variant="body1">
                        - Port {port} (Open)
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body2">No open ports found</Typography>
                  )}
                </Box>
              )}

              {/* Vulnerabilities */}
              {scanResults.vulnerabilities && (
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="h6">Vulnerabilities:</Typography>
                  {scanResults.vulnerabilities.length > 0 ? (
                    scanResults.vulnerabilities.map((vuln, index) => (
                      <Typography key={index} variant="body1">
                        - {vuln}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body2">No vulnerabilities found</Typography>
                  )}
                </Box>
              )}

              {/* SSL Info */}
              {scanResults.ssl_info && (
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="h6">SSL Info:</Typography>
                  <Typography variant="body1">{scanResults.ssl_info}</Typography>
                </Box>
              )}
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ScanSettingsPanel;
