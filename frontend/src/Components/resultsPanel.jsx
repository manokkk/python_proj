import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const ResultsPanel = ({ scanResults }) => {
  return (
    <Box sx={{ marginTop: 3 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Scan Results
        </Typography>

        {/* TLS Versions */}
        {scanResults.tls_versions && (
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6">Supported TLS Versions:</Typography>
            {scanResults.tls_versions.length > 0 ? (
              scanResults.tls_versions.map((version, index) => (
                <Typography key={index} variant="body1">
                  - {version}
                </Typography>
              ))
            ) : (
              <Typography variant="body2">No supported TLS versions found</Typography>
            )}
          </Box>
        )}

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
      </Paper>
    </Box>
  );
};

export default ResultsPanel;
