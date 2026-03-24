import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // CRITICAL: withCredentials allows the browser to save the cookie
            await axios.post('http://localhost:5000/api/users/login', formData, { withCredentials: true });
            navigate('/me');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5">Login</Typography>
                {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField margin="normal" fullWidth label="Email" name="email" onChange={handleChange} required />
                    <TextField margin="normal" fullWidth label="Password" name="password" type="password" onChange={handleChange} required />
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>Login</Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;