// src/App.jsx
import React, { useState } from 'react';
import { Box, CssBaseline, Typography, Link } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

// Importing Components
import Navbar from './Components/navbar';
import Sidebar from './Components/sidebar';
import Home from './Components/home';
import ScanSettings from './Components/scanSettingsPanel';
import Results from './Components/resultsPanel';
import Login from './Components/login';
import SignUp from './Components/signup';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <CssBaseline />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <Box sx={{ display: 'flex', marginTop: 8 }}>
        {/* Sidebar */}
        {/* <Sidebar /> */}

        {/* Main Window (Content area) */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            backgroundColor: '#f4f4f4',
            padding: 3,
          }}
        >
          <Routes>
            {/* Default route - redirect to login page */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<AuthPage isLogin={true} />} />
            <Route path="/signup" element={<AuthPage isLogin={false} />} />
            <Route path="/scan-settings" element={<ScanSettings />} />
            <Route path="/results" element={<Results />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

function AuthPage({ isLogin }) {
  const navigate = useNavigate();

  return (
    <Box>
      {isLogin ? <Login /> : <SignUp />}
      <Box mt={2} textAlign="center">
        <Typography variant="body2">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <Link href="#" onClick={() => navigate('/signup')}>
                Sign Up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link href="#" onClick={() => navigate('/login')}>
                Login
              </Link>
            </>
          )}
        </Typography>
      </Box>
    </Box>
  );
}

export default App;
