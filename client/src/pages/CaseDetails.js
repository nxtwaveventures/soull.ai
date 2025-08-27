import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Paper, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';

import CaseProgressTracker from '../components/case/CaseProgressTracker';
import Chat from '../components/case/Chat';
import FeedbackForm from '../components/case/FeedbackForm';

const CaseDetails = () => {
    const { id } = useParams();
    const [caseData, setCaseData] = useState(null);
    const [loading, setLoading] = useState(true);

    // This is a placeholder for the logged-in user's ID
    const userId = '60c72b0f9b1d8c001f8e4d8b'; // Replace with actual auth user ID

    useEffect(() => {
        const fetchCase = async () => {
            try {
                // Auth token would be required here
                const res = await axios.get(`/api/v1/cases/${id}`);
                setCaseData(res.data.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchCase();
    }, [id]);

    const handleFeedbackSubmit = async (feedbackData) => {
        try {
            // This would also require auth
            await axios.post('/api/v1/feedback', feedbackData);
            alert('Feedback submitted!');
        } catch (err) {
            console.error(err);
            alert('Failed to submit feedback.');
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (!caseData) {
        return <Typography>Case not found.</Typography>;
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Case: {caseData.patientId}
                </Typography>

                <CaseProgressTracker status={caseData.status} />

                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6">Case Details</Typography>
                            <Typography variant="body1">{caseData.caseDetails}</Typography>
                        </Paper>

                        {/* Conditionally render feedback form */}
                        {(caseData.status === 'report-generated' || caseData.status === 'completed') && (
                            <FeedbackForm caseId={id} onSubmit={handleFeedbackSubmit} />
                        )}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Chat caseId={id} userId={userId} />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default CaseDetails;
