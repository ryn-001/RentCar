import { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { config } from '../config';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                `${config.endpoint}/users/login`,
                formData
            );

            const { token, user } = res.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            toast.success("Login successful");

            setTimeout(() => {
                navigate('/');
                setUser(user);
            }, 1500);

        } catch (err) {
            toast.error(err.response?.data?.message || 'Invalid credentials');
        }
    };

    return (
        <Container maxWidth="xs">
            <ToastContainer />
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