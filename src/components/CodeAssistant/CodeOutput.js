// src/components/CodeAssistant/CodeOutput.js
import React from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import { ContentCopy as CopyIcon } from '@mui/icons-material';
import Editor from '@monaco-editor/react';

function CodeOutput({ result }) {
  const handleCopyCode = () => {
    if (result && result.code) {
      navigator.clipboard.writeText(result.code);
    }
  };

  if (!result) {
    return null;
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Generated Code</Typography>
        <Button
          startIcon={<CopyIcon />}
          onClick={handleCopyCode}
          size="small"
          disabled={!result.code}
        >
          Copy Code
        </Button>
      </Box>
      
      {result.code && (
        <Box sx={{ border: '1px solid #ccc', mb: 3 }}>
          <Editor
            height="400px"
            language={result.language || 'javascript'}
            value={result.code}
            theme="vs-dark"
            options={{
              readOnly: true,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              folding: true,
              lineNumbers: 'on',
              scrollbar: { vertical: 'auto', horizontal: 'auto' },
            }}
          />
        </Box>
      )}
      
      {result.explanation && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Explanation
          </Typography>
          <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
            {result.explanation}
          </Typography>
        </Box>
      )}
    </Paper>
  );
}

export default CodeOutput;
