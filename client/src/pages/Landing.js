import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 64px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(to right, #A8E6CF, #FFD3B6)', // Calming gradient
                color: '#2F4F4F', // Dark slate gray for better readability
                textAlign: 'center',
                p: 3,
            }}
        >
            <Container maxWidth="md">
                <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                >
                    Secure Second Opinions.
                </Typography>
                <Typography variant="h5" component="p" sx={{ my: 3, opacity: 0.9 }}>
                    Connect with AYUSH specialists for your patient cases.
                </Typography>
                <Button
                    variant="contained"
                    component={Link}
                    to="/register"
                    size="large"
                    sx={{
                        mt: 4,
                        backgroundColor: '#1E847F', // A solid, darker teal/green
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#166562', // A slightly darker shade for hover
                        },
                    }}
                >
                    Start Consulting
                </Button>
            </Container>
        </Box>
    );
};

export default Landing;
