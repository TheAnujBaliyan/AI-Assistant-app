// src/components/PaperAssistant/PdfUploader.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Alert,
} from '@mui/material';
import { CloudUpload as UploadIcon } from '@mui/icons-material';

function PdfUploader({ onFileSelected, processingOptions, setProcessingOptions }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    
    if (selectedFile && selectedFile.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      setFile(null);
      return;
    }
    
    setError('');
    setFile(selectedFile);
    onFileSelected(selectedFile);
  };

  const handleOptionChange = (event) => {
    setProcessingOptions({
      ...processingOptions,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Upload PDF
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <Box
        sx={{
          border: '2px dashed grey',
          borderRadius: 2,
          p: 3,
          textAlign: 'center',
          mb: 3,
        }}
      >
        <input
          type="file"
          accept="application/pdf"
          id="pdf-upload"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <label htmlFor="pdf-upload">
          <Button
            variant="contained"
            component="span"
            startIcon={<UploadIcon />}
          >
            Select PDF
          </Button>
        </label>
        
        {file && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            Selected file: {file.name}
          </Typography>
        )}
      </Box>
      
      <Typography variant="h6" gutterBottom>
        Processing Options
      </Typography>
      
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={processingOptions.summary}
              onChange={handleOptionChange}
              name="summary"
            />
          }
          label="Generate Summary"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={processingOptions.grammar}
              onChange={handleOptionChange}
              name="grammar"
            />
          }
          label="Check Grammar"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={processingOptions.plagiarism}
              onChange={handleOptionChange}
              name="plagiarism"
            />
          }
          label="Check Plagiarism"
        />
      </FormGroup>
    </Paper>
  );
}

export default PdfUploader;
