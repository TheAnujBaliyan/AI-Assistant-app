// src/components/common/Tabs.js
import React from 'react';
import { Box, Tabs as MuiTabs, Tab, useMediaQuery, useTheme } from '@mui/material';
import {
  Description as PaperIcon,
  Code as CodeIcon,
  Chat as ChatIcon,
} from '@mui/icons-material';

function Tabs({ value, onChange }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider', mb: 2 }}>
      <MuiTabs
        value={value}
        onChange={onChange}
        variant={isMobile ? 'fullWidth' : 'standard'}
        centered={!isMobile}
        aria-label="assistant tabs"
      >
        <Tab 
          icon={<PaperIcon />} 
          label="Paper Assistant" 
          id="tab-0" 
          aria-controls="tabpanel-0" 
        />
        <Tab 
          icon={<CodeIcon />} 
          label="Code Assistant" 
          id="tab-1" 
          aria-controls="tabpanel-1" 
        />
        <Tab 
          icon={<ChatIcon />} 
          label="Chat Assistant" 
          id="tab-2" 
          aria-controls="tabpanel-2" 
        />
      </MuiTabs>
    </Box>
  );
}

export default Tabs;
