import { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await login(formData.email, formData.password);

            if (res.user.role === 'admin') {
                navigate('/add-car');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    mt: 10,
                    p: 4,
                    borderRadius: 3,
                    bgcolor: '#1a1a1a',
                    color: '#fff',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.6)'
                }}
            >
                <Typography variant="h5" align="center" sx={{ color: '#ff7a00', mb: 2 }}>
                    Login
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        required
                        sx={{
                            input: { color: '#fff' },
                            label: { color: '#ccc' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#333' },
                                '&:hover fieldset': { borderColor: '#ff7a00' }
                            }
                        }}
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        required
                        sx={{
                            input: { color: '#fff' },
                            label: { color: '#ccc' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#333' },
                                '&:hover fieldset': { borderColor: '#ff7a00' }
                            }
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            bgcolor: '#ff7a00',
                            '&:hover': { bgcolor: '#e66900' }
                        }}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;