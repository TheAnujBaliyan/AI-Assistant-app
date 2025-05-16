// src/components/ChatAssistant/MessageList.js
import React from 'react';
import { Box, Typography, Avatar, Paper } from '@mui/material';
import { format } from 'date-fns';

function MessageList({ messages }) {
  if (!messages || messages.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Typography variant="body2" color="textSecondary">
          Start a conversation by sending a message.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {messages.map((msg, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            mb: 2,
            flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
          }}
        >
          <Avatar
            sx={{
              bgcolor: msg.role === 'user' ? 'primary.main' : 'secondary.main',
              width: 32,
              height: 32,
              mx: 1,
            }}
          >
            {msg.role === 'user' ? 'U' : 'A'}
          </Avatar>
          <Paper
            elevation={1}
            sx={{
              p: 2,
              maxWidth: '70%',
              bgcolor: msg.role === 'user' ? 'primary.light' : 'background.paper',
              borderRadius: 2,
            }}
          >
            <Typography variant="body1" sx={{ mb: 1 }}>
              {msg.content}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {format(new Date(msg.timestamp), 'h:mm a')}
            </Typography>
          </Paper>
        </Box>
      ))}
    </Box>
  );
}

export default MessageList;
