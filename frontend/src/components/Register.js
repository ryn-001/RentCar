import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', fullname: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await axios.post('http://localhost:5000/api/users/register', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5">Register</Typography>
                {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField margin="normal" fullWidth label="Username" name="username" onChange={handleChange} required />
                    <TextField margin="normal" fullWidth label="Full Name" name="fullname" onChange={handleChange} required />
                    <TextField margin="normal" fullWidth label="Email" name="email" type="email" onChange={handleChange} required />
                    <TextField margin="normal" fullWidth label="Password (Lowercase only)" name="password" type="password" onChange={handleChange} required />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>Sign Up</Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;