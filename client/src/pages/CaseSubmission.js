import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
} from '@mui/material';
import axios from 'axios';

const CaseSubmission = () => {
    const [formData, setFormData] = useState({
        patientId: '',
        caseDetails: '',
    });
    const [files, setFiles] = useState([]);

    const { patientId, caseDetails } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onFileChange = (e) => {
        setFiles(e.target.files);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const submissionData = new FormData();
        submissionData.append('patientId', patientId);
        submissionData.append('caseDetails', caseDetails);
        for (let i = 0; i < files.length; i++) {
            submissionData.append('files', files[i]);
        }

        try {
            // This requires setting up the auth token in axios headers
            const res = await axios.post('/api/v1/cases', submissionData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'Authorization': `Bearer ${token}`
                },
            });
            console.log(res.data);
            // Handle successful submission
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Submit a New Case
                </Typography>
                <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="patientId"
                        label="Anonymized Patient ID"
                        name="patientId"
                        value={patientId}
                        onChange={onChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="caseDetails"
                        label="Case Details (Medical History, Symptoms, etc.)"
                        id="caseDetails"
                        multiline
                        rows={10}
                        value={caseDetails}
                        onChange={onChange}
                    />
                    <Button variant="contained" component="label" sx={{ mt: 2 }}>
                        Upload Files
                        <input type="file" hidden multiple onChange={onFileChange} />
                    </Button>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        {files.length} file(s) selected
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit Case
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default CaseSubmission;
