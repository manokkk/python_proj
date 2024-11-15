import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import axios from 'axios';

const SignUp = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValues.password !== formValues.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/register/', formValues);
      // On success, handle the response (e.g., show a success message, redirect, etc.)
      setSuccessMessage('User registered successfully');
      setFormValues({ name: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      setErrorMessage('Error registering user');
      console.error(err);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, margin: 'auto', mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      {successMessage && <Typography color="success">{successMessage}</Typography>}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          required
          margin="normal"
          value={formValues.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          required
          margin="normal"
          value={formValues.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          required
          margin="normal"
          value={formValues.password}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          required
          margin="normal"
          value={formValues.confirmPassword}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
          Sign Up
        </Button>
      </Box>
    </Paper>
  );
};

export default SignUp;
