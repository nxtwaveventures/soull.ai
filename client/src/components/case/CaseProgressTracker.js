import React from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';

const steps = [
    'Submitted',
    'Assigned to Specialist',
    'Under Review',
    'Report Generated',
    'Completed',
];

const CaseProgressTracker = ({ status }) => {
    const getActiveStep = () => {
        switch (status) {
            case 'submitted':
                return 0;
            case 'assigned':
                return 1;
            case 'in-progress':
                return 2;
            case 'report-generated':
                return 3;
            case 'completed':
                return 4;
            default:
                return 0;
        }
    };

    return (
        <Box sx={{ width: '100%', my: 4 }}>
            <Stepper activeStep={getActiveStep()} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default CaseProgressTracker;
