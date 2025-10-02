import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { GlobalStyles, AppContainer } from './styles/GlobalStyles';
import Login from './pages/Login';
import PasswordReset from './pages/PasswordReset';
import Dashboard from './pages/Dashboard';
import ClientList from './pages/ClientList';
import ClientDetail from './pages/ClientDetail';
import AssessmentForm from './pages/AssessmentForm';
import ReportViewer from './pages/ReportViewer';
import Settings from './pages/Settings';
import Communication from './pages/Communication';
import Help from './pages/Help';
import EvieChatbot from './components/EvieChatbot';

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/password-reset';

  return (
    <AppContainer>
      <GlobalStyles />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clients" element={<ClientList />} />
        <Route path="/clients/:id" element={<ClientDetail />} />
        <Route path="/assessment/:clientId" element={<AssessmentForm />} />
        <Route path="/report/:clientId" element={<ReportViewer />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/communication" element={<Communication />} />
        <Route path="/help" element={<Help />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
      {!isAuthPage && <EvieChatbot />}
    </AppContainer>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
