import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Education from './pages/Education';
import Research from './pages/Research';
import Policy from './pages/Policy';
import Quality from './pages/Quality';
import Profile from './pages/Profile';
import AIChatbot from './components/AIChatbot';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/education" element={<Education />} />
          <Route path="/research" element={<Research />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
      <AIChatbot />
    </Router>
  );
};

export default App;