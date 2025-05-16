// src/App.js
import React, { useState } from 'react';
import { CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Footer from './components/Layout/Footer';
import Dashboard from './pages/Dashboard';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ForgotPassword from './components/Auth/ForgotPassword';
import PaperAssistantPage from './pages/PaperAssistantPage';
import CodeAssistantPage from './pages/CodeAssistantPage';
import ChatAssistantPage from './pages/ChatAssistantPage';
import ChatHistoryPage from './pages/ChatHistoryPage';
import ProfilePage from './pages/ProfilePage';
import { useAuth } from './contexts/AuthContext';

// Protected route component
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

function Layout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { currentUser } = useAuth();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      {currentUser && <Header toggleDrawer={toggleDrawer} />}
      {currentUser && <Sidebar open={drawerOpen} toggleDrawer={toggleDrawer} />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          mt: currentUser ? 8 : 0,
        }}
      >
        {children}
        {currentUser && <Footer />}
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route 
                path="/dashboard" 
                element={<PrivateRoute><Dashboard /></PrivateRoute>} 
              />
              <Route 
                path="/paper-assistant" 
                element={<PrivateRoute><PaperAssistantPage /></PrivateRoute>} 
              />
              <Route 
                path="/code-assistant" 
                element={<PrivateRoute><CodeAssistantPage /></PrivateRoute>} 
              />
              <Route 
                path="/chat-assistant" 
                element={<PrivateRoute><ChatAssistantPage /></PrivateRoute>} 
              />
              <Route 
                path="/chat-history" 
                element={<PrivateRoute><ChatHistoryPage /></PrivateRoute>} 
              />
              <Route 
                path="/profile" 
                element={<PrivateRoute><ProfilePage /></PrivateRoute>} 
              />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
