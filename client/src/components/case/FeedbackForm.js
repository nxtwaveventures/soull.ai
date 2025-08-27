import React from 'react';
import { Box, Typography, Rating, TextField, Button } from '@mui/material';

const FeedbackForm = ({ caseId, onSubmit }) => {
    const [rating, setRating] = React.useState(0);
    const [comments, setComments] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ caseId, rating, comments });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <Typography component="legend">Rate the Consultation</Typography>
            <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                    setRating(newValue);
                }}
            />
            <TextField
                fullWidth
                multiline
                rows={4}
                margin="normal"
                label="Comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
            />
            <Button type="submit" variant="contained">Submit Feedback</Button>
        </Box>
    );
};

export default FeedbackForm;
