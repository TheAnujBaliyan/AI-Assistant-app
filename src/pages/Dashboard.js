// src/pages/Dashboard.js
import React, { useState } from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import Tabs from '../components/common/Tabs';
import TabPanel from '../components/common/TabPanel';
import PaperAssistantPage from './PaperAssistantPage';
import CodeAssistantPage from './CodeAssistantPage';
import ChatAssistantPage from './ChatAssistantPage';

function Dashboard() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          AI Assistant Dashboard
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to your AI Assistant. Use the tabs below to access different features.
        </Typography>
      </Paper>
      
      <Tabs value={tabValue} onChange={handleTabChange} />
      
      <TabPanel value={tabValue} index={0}>
        <PaperAssistantPage />
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        <CodeAssistantPage />
      </TabPanel>
      
      <TabPanel value={tabValue} index={2}>
        <ChatAssistantPage />
      </TabPanel>
    </Container>
  );
}

export default Dashboard;
