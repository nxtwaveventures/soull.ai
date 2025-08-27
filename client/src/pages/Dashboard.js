import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    // This would be replaced with actual user data and logic
    const user = {
        name: 'Dr. Jane Doe',
        role: 'conventional',
    };

    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Dashboard
                </Typography>
                <Typography variant="h6">Welcome, {user.name}</Typography>

                {user.role === 'conventional' && (
                    <Button
                        variant="contained"
                        component={Link}
                        to="/submit-case"
                        sx={{ mt: 2 }}
                    >
                        Submit a New Case
                    </Button>
                )}

                <Typography variant="h5" sx={{ mt: 4 }}>
                    Your Cases
                </Typography>
                {/* Placeholder for case list */}
                <p>Case list will be displayed here.</p>
            </Box>
        </Container>
    );
};

export default Dashboard;
