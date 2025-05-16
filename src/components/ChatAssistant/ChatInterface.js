// src/components/ChatAssistant/ChatInterface.js
import React, { useState, useEffect, useRef } from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Send as SendIcon,
  AttachFile as AttachIcon,
} from '@mui/icons-material';
import ModelSelector from '../common/ModelSelector';
import MessageList from './MessageList';
import DocumentUploader from './DocumentUploader';

function ChatInterface({ onSendMessage, onUploadDocument, messages, loading }) {
  const [message, setMessage] = useState('');
  const [model, setModel] = useState('llama');
  const [showUploader, setShowUploader] = useState(false);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message, model);
      setMessage('');
    }
  };

  const toggleUploader = () => {
    setShowUploader(!showUploader);
  };

  return (
    <Paper elevation={3} sx={{ p: 0, display: 'flex', flexDirection: 'column', height: '70vh' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs>
            <Typography variant="h6">Chat Assistant</Typography>
          </Grid>
          <Grid item>
            <ModelSelector
              value={model}
              onChange={(e) => setModel(e.target.value)}
              helperText=""
            />
          </Grid>
        </Grid>
      </Box>
      
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
        <MessageList messages={messages} />
        <div ref={endOfMessagesRef} />
      </Box>
      
      {showUploader && (
        <Box sx={{ p: 2, borderTop: '1px solid #eee' }}>
          <DocumentUploader onUpload={onUploadDocument} onClose={toggleUploader} />
        </Box>
      )}
      
      <Divider />
      
      <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
        <Grid container spacing={1}>
          <Grid item>
            <IconButton 
              color="primary"
              aria-label="attach document"
              onClick={toggleUploader}
            >
              <AttachIcon />
            </IconButton>
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              placeholder="Type your message..."
              variant="outlined"
              size="small"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
            />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              disabled={!message.trim() || loading}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default ChatInterface;
