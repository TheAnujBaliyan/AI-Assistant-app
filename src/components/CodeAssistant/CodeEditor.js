// src/components/CodeAssistant/CodeEditor.js
import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import ModelSelector from '../common/ModelSelector';

function CodeEditor({ onSubmit, loading }) {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('llama');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(prompt, model);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Code Generation
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={6}
              label="Describe the code you want to generate"
              variant="outlined"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ModelSelector
              value={model}
              onChange={(e) => setModel(e.target.value)}
              helperText="Select the model for code generation"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading || !prompt.trim()}
              fullWidth
            >
              {loading ? 'Generating...' : 'Generate Code'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default CodeEditor;
